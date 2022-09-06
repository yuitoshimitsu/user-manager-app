import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import MySwal from "../..";
import { getUser, updateUser } from "../../helpers/api";

// { handleInputFirstName, onHide, show } = props
function UpdateModal({ onHide, show, userId }) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const schema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().required(),
    status: yup.string().required(),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const fetchUser = async () => {
    try {
      await getUser(userId).then(({ data }) => {
        reset(data);
      });
    } catch (error) {
      MySwal.fire({
        icon: "error",
        title: "Failed to fetch users.",
      });
    }
  };

  useEffect(() => {
    if (userId && show) {
      fetchUser();
    }
  }, [userId, show]);

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      await updateUser(userId, data).then(({ data }) => {
        onHide(false);
        Swal.fire({
          icon: "success",
          title: "Update user successfully!",
          showConfirmButton: true,
        }).then((result) => {
          if (result.isConfirmed) {
            dispatch({ type: "UPDATE_USER" });
          }
        });
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Failed to fetch users.",
      });
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Update User
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Name
        <Form.Control
          {...register("name")}
          className={errors.name ? "is-invalid mb-2" : "mb-2"}
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
        />
        {errors.name && (
          <Form.Control.Feedback type="invalid" className="d-block">
            {errors.name.message}
          </Form.Control.Feedback>
        )}
        Email
        <Form.Control
          {...register("email")}
          type="email"
          className={errors.email ? "is-invalid mb-2" : "mb-2"}
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
        />
        {errors.email && (
          <Form.Control.Feedback type="invalid" className="d-block">
            {errors.email.message}
          </Form.Control.Feedback>
        )}
        <Form.Select
          {...register("status")}
          className={errors.status ? "is-invalid mb-2" : "mb-2"}
          aria-label="Default select example"
        >
          Status select
          <option value="active">active</option>
          <option value="inactive">inactive</option>
        </Form.Select>
        {errors.status && (
          <Form.Control.Feedback type="invalid" className="d-block">
            {errors.status.message}
          </Form.Control.Feedback>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={handleSubmit(onSubmit)}
          className="me-2"
          variant="primary"
        >
          Update
        </Button>
        <Button onClick={onHide} variant="danger">
          Cansel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UpdateModal;
