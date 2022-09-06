import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "./helpers/api";
import "bootstrap/dist/css/bootstrap.min.css";
// Styles
import "./app.scss";

// Components
import Loader from "./components/Loader";
import MySwal from "./index";
import { Table, Button } from "react-bootstrap";

import Header from "./components/header";
import Footer from "./components/footer";
import MyVerticallyCenteredModal from "./components/create-user";
import UpdateModal from "./components/update-user";
import DeleteModal from "./components/delete-user";

//import ReactPaginate from "react-paginate";

function App() {
  const dispatch = useDispatch();
  const { users, createUserSuccess, updateUserSuccess, deleteUserSuccess } =
    useSelector((state) => ({
      users: state.users,
      createUserSuccess: state.createUserSuccess,
      updateUserSuccess: state.updateUserSuccess,
      deleteUserSuccess: state.deleteUserSuccess,
    }));
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [modalShow, setModalShow] = useState(false);
  const [updatemodalShow, setUpdateModalShow] = useState(false);
  const [deletemodalShow, setDeleteModalShow] = useState(false);
  const [userId, setUserId] = useState();


  // Fetch Users
  const fetchUsers = async () => {
    setLoading(true);

    try {
      await getUsers(page).then(({ data }) => {
        dispatch({ type: "SET_USERS", data: data });
      });
    } catch (err) {
      MySwal.fire({
        icon: "error",
        title: "Failed to fetch users.",
      });
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, createUserSuccess, updateUserSuccess, deleteUserSuccess]);

  return (
    <div className="app">
      {
        <div>
          <Header />

          <div className="create-button">
            <>
              <Button
                className="create-newuser"
                variant="primary"
                onClick={() => setModalShow(true)}
              >
                Create New User
              </Button>

              <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
              />
            </>
          </div>

          {loading ? (
            <Loader />
          ) : (
            <>
              <Table striped>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Gender</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                {/* length of array > 0 */}
                <tbody>
                  {users &&
                    users.length > 0 &&
                    users.map((user) => (
                      <tr key={user.id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.gender}</td>
                        <td>{user.status}</td>
                        <td>
                          <div className="action-button">
                            <Button
                              className="me-2"
                              variant="primary"
                              onClick={() => {
                                setUserId(user.id);
                                setUpdateModalShow(true);
                              }}
                            >
                              Update
                            </Button>

                            <Button
                              variant="danger"
                              onClick={() => {
                                setUserId(user.id);
                                setDeleteModalShow(true);
                              }}
                            >
                              Delete
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>

 

              <UpdateModal
                show={updatemodalShow}
                onHide={() => setUpdateModalShow(false)}
                userId={userId}
              />

              <DeleteModal
                show={deletemodalShow}
                onHide={() => setDeleteModalShow(false)}
                userId={userId}
              />

             
              {/* <ReactPaginate
              previousLabel={"Prev"}
              nextLabel={"Next"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={3}
              marginPagesDisplayed={2}
              onPageChange={handlePageClick}
              forcePage={page - 1}
              pageRangeDisplayed={5}
              containerClassName={"pagination"}
              subContainerClassName={"pages pagination"}
              activeClassName={"active"} /> */}
            </>
          )}

          <Footer />
        </div>
      }
    </div>
  );
}

export default App;
