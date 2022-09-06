import { useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { addUser } from "../../helpers/api";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const SignupSchema = yup.object().shape({
  firstName: yup.string().required(),
  age: yup.number().required().positive().integer(),
});

// { handleInputFirstName, onHide, show } = props
function MyVerticallyCenteredModal({ onHide, show }) {
  /* const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch(); */

  /* const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleSelectGender = (e) => {
    setGender(e.target.value);
  };

  const handleSelectStatus = (e) => {
    setStatus(e.target.value);
  }; */

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SignupSchema),
  });
  const onSubmit = (data) => {
    alert(JSON.stringify(data))
  };

  /* const handleSubmit = async () => {
    setLoading(true);

    try {
      await addUser(name, email, gender, status).then(({ data }) => {
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
  }; */

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
      <form onSubmit={handleSubmit(onSubmit)}>

      <Modal.Body>
          <div>
            <label>First Name</label>
            <input {...register("firstName")} />
            {errors.firstName && <p>{errors.firstName.message}</p>}
          </div>
          <div style={{ marginBottom: 10 }}>
            <label>Last Name</label>
            <input {...register("lastName")} />
            {errors.lastName && <p>{errors.lastName.message}</p>}
          </div>
          <div>
            <label>Age</label>
            <input
              type="number"
              {...register("age", { valueAsNumber: true })}
            />
            {errors.age && <p>{errors.age.message}</p>}
          </div>
          
        {/* Name
        <Form.Control
          className='mb-2'
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          onChange={handleChangeName}
        />

        Email
        <Form.Control
          type='email'
          className='mb-2'
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          onChange={handleChangeEmail}
        />

        <Form.Select aria-label="Default select example" onChange={handleSelectGender} className='mb-2'>
          <option>Gender select</option>
          <option value="male">male</option>
          <option value="female">female</option>
        </Form.Select>

        <Form.Select aria-label="Default select example" onChange={handleSelectStatus}>
          <option>Status select</option>
          <option value="active">active</option>
          <option value="inactive">inactive</option>
        </Form.Select> */}
      </Modal.Body>
      <Modal.Footer>
        {/* <Button onClick={handleSubmit} className="me-2" variant="primary">
          Create
        </Button>
        <Button onClick={onHide} variant="danger">
          Cansel
        </Button> */}
        <input type="submit" />
      </Modal.Footer>
      </form> 

    </Modal>
  );
}

export default MyVerticallyCenteredModal;
