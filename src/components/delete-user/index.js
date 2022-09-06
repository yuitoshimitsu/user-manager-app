import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { deleteUser, getUser } from "../../helpers/api";
import Button from "react-bootstrap/Button";
import MySwal from "../..";
import { useDispatch } from "react-redux";
import Modal from "react-bootstrap/Modal";

function DeleteModal({ onHide, show, userId }) {
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const fetchUser = async () => {
    try {
      await getUser(userId).then(({ data }) => {
        console.log("delete user data", data);
        setName(data.name);
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

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await deleteUser(userId).then(({ data }) => {
        onHide(false);
        Swal.fire({
          icon: "success",
          title: "Delete user successfully!",
          showConfirmButton: true,
        }).then((result) => {
          if (result.isConfirmed) {
            dispatch({ type: "DELETE_USER" });
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
          Delete User
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete {name}?</Modal.Body>

      <Modal.Footer>
        <Button onClick={handleSubmit} className="me-2" variant="primary">
          Delete
        </Button>
        <Button onClick={onHide} variant="danger">
          Cansel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteModal;
