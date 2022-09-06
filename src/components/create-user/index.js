import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { addUser } from "../../helpers/api";

// { handleInputFirstName, onHide, show } = props
function MyVerticallyCenteredModal({ onHide, show }) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const schema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().required(),
    gender: yup.string().required(),
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

  useEffect(() => {
    if (show) {
      reset({
        name: "",
        email: "",
        gender: "",
        status: "",
      });
    }
  }, [show]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await addUser(data).then(({ data }) => {
        onHide(false);
        Swal.fire({
          icon: "success",
          title: "Create user successfully!",
          showConfirmButton: true,
        }).then((result) => {
          if (result.isConfirmed) {
            dispatch({ type: "CREATE_USER" });
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
          Create User
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          Name
          <Form.Control
            {...register("name")}
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            className={errors.name ? "is-invalid mb-2" : "mb-2"}
          />
          <p>
            {errors.name && (
              <Form.Control.Feedback type="invalid" className="d-block">
                {errors.name.message}
              </Form.Control.Feedback>
            )}
          </p>
        </div>

        <div>
          Email
          <Form.Control
            {...register("email")}
            type="email"
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            className={errors.email ? "is-invalid mb-2" : "mb-2"}
          />
          <p>
            {errors.email && (
              <Form.Control.Feedback type="invalid" className="d-block">
                {errors.email.message}
              </Form.Control.Feedback>
            )}
          </p>
        </div>

        <div>
          <Form.Select
            {...register("gender")}
            aria-label="Default select example"
            className={errors.gender ? "is-invalid mb-2" : "mb-2"}
          >
            <option value="">Gender select</option>
            <option value="male">male</option>
            <option value="female">female</option>
          </Form.Select>
          <p>
            {errors.gender && (
              <Form.Control.Feedback type="invalid" className="d-block">
                {errors.gender.message}
              </Form.Control.Feedback>
            )}
          </p>
        </div>

        <div>
          <Form.Select
            {...register("status")}
            aria-label="Default select example"
            className={errors.status ? "is-invalid mb-2" : "mb-2"}
          >
            <option value="">Status select</option>
            <option value="active">active</option>
            <option value="inactive">inactive</option>
          </Form.Select>
          <p>
            {errors.status && (
              <Form.Control.Feedback type="invalid" className="d-block">
                {errors.status.message}
              </Form.Control.Feedback>
            )}
          </p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={handleSubmit(onSubmit)}
          className="me-2"
          variant="primary"
        >
          Create
        </Button>
        <Button onClick={onHide} variant="danger">
          Cansel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MyVerticallyCenteredModal;
