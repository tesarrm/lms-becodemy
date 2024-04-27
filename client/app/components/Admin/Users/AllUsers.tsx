"use client"; //barang wajib
import React, { FC, useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineMail } from "react-icons/ai";
import { Box, Button, Modal } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useTheme } from "next-themes";
import { FiEdit2 } from "react-icons/fi";
import Loader from "../../Loader";
import { format } from "timeago.js";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
} from "@/redux/features/user/userApi";
import { styles } from "@/app/styles/styles";
import toast from "react-hot-toast";

type Props = {
  isTeam: boolean;
};

const AllUsers: FC<Props> = ({ isTeam }) => {
  const { theme, setTheme } = useTheme();
  const [active, setActive] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("admin");
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const [deleteUser, { isSuccess: successDelete, error: errorDelete }] =
    useDeleteUserMutation({});

  const [updateUserRole, { error: updateError, isSuccess }] =
    useUpdateUserRoleMutation();

  const { isLoading, data, error, refetch } = useGetAllUsersQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  useEffect(() => {
    if (updateError) {
      if ("data" in updateError) {
        const errorMessage = updateError as any;
        toast.error(errorMessage.data.message);
      }
    }
    if (isSuccess) {
      refetch();
      toast.success("User role updated successfully");
      setActive(false);
    }
    if (successDelete) {
      refetch();
      toast.success("User role deleted successfully");
      setOpen(false);
    }
    if (errorDelete) {
      if ("data" in errorDelete) {
        const errorMessage = errorDelete as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [updateError, isSuccess, successDelete]);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.3 },
    { field: "name", headerName: "Name", flex: 0.5 },
    { field: "email", headerName: "Email", flex: 0.5 },
    { field: "role", headerName: "Role", flex: 0.5 },
    { field: "courses", headerName: "Purchased Course", flex: 0.5 },
    { field: "created_at", headerName: "Join At", flex: 0.5 },
    {
      field: "  ",
      headerName: "Delete",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <>
            <Button
              onClick={() => {
                setOpen(!open);
                setUserId(params.row.id);
              }}
            >
              <AiOutlineDelete
                className="dark:text-white text-black"
                size={20}
              />
            </Button>
          </>
        );
      },
    },
    {
      field: " ",
      headerName: "Email",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <>
            <a
              href={`mailto:${params.row.email}`}
              style={{ display: "block", marginTop: "16px" }}
            >
              <AiOutlineMail className="dark:text-white text-black" size={20} />
            </a>
          </>
        );
      },
    },
  ];

  const rows: any = [];

  if (isTeam) {
    const newData =
      data && data.users.filter((item: any) => item.role === "admin");

    newData &&
      newData.forEach((item: any) => {
        rows.push({
          id: item._id,
          name: item.name,
          email: item.email,
          role: item.role,
          courses: item.courses.length,
          created_at: format(item.createdAt),
        });
      });
  } else {
    data &&
      data.users.forEach((item: any) => {
        rows.push({
          id: item._id,
          name: item.name,
          email: item.email,
          role: item.role,
          courses: item.courses.length,
          created_at: format(item.createdAt),
        });
      });
  }

  const handleSubmit = async () => {
    await updateUserRole({ email, role });
    console.log("halo");
  };

  const handleDelete = async () => {
    const id = userId;
    await deleteUser(id);
  };

  return (
    <div className="mt-[120px]">
      {isLoading ? (
        <Loader />
      ) : (
        <Box m="20px">
          <div className="w-full flex justify-end">
            <div
              className={`${styles.button} !w-[200px] dark:bg-[#57c7a3] !h-[35px] dark:border dark:border-[#ffffff6c]`}
              onClick={() => setActive(!active)}
            >
              Add New Member
            </div>
          </div>
          <Box
            m="40px 0 0 0"
            height="80vh"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
                outline: "none",
              },
              "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-sortIcon": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-row": {
                color: theme === "dark" ? "#fff" : "#000",
                borderBottom:
                  theme === "dark"
                    ? "1px solid #ffffff30!important"
                    : "1px solid #ccc!important",
              },
              "& .MuiTablePagination-root": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .name-column-cell": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-columnHeaders": {
                //   color: theme === "dark" ? "#fff" : "#000",
                borderBottom: "none",
                backgroundColor: theme === "dark" ? "#3e4396" : "#a4a9fc",
                //   backgroundColor: "#a4a9fc",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: theme === "dark" ? "#1f2a40" : "#f2f0f0",
              },
              "& .MuiDataGrid-footerContainer": {
                color: theme === "dark" ? "#fff" : "#000",
                borderTop: "none",
                backgroundColor: theme === "dark" ? "#3e4396" : "#a4a9fc",
              },
              "& .MuiCheckbox-root": {
                color:
                  theme === "dark" ? `#b7ebde !important` : `#000 !important`,
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-next": {
                color: `#fff !important`,
              },
            }}
          >
            <DataGrid checkboxSelection rows={rows} columns={columns} />
          </Box>
          {active && (
            <Modal
              open={active}
              onClose={() => setOpen(!open)}
              aria-labeleby="modal-modal-title"
              aria-describedy="modal-modal-description"
            >
              <Box className="absolute top-[50%] left-[50%] -translatex-1/2 -translate-y-1/2 w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none">
                <h1 className={`${styles.title}`}>Add new member</h1>
                <div className="mt-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email"
                    className={`${styles.input}`}
                  />
                  <select
                    name=""
                    id=""
                    className={`${styles.input}`}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                  <br />
                  <div
                    className={`${styles.button} my-6 !h-[30px]`}
                    onClick={() => handleSubmit()}
                  >
                    Submit
                  </div>
                </div>
              </Box>
            </Modal>
          )}
          {open && (
            <Modal
              open={open}
              onClose={() => setActive(!active)}
              aria-labeleby="modal-modal-title"
              aria-describedy="modal-modal-description"
            >
              <Box className="absolute top-[50%] left-[50%] -translatex-1/2 -translate-y-1/2 w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none">
                <h1 className={`${styles.title}`}>
                  Are you sure you want to delete this user?
                </h1>

                <div className="flex w-full items-center justify-between mb-6 mt-4">
                  <div
                    className={`${styles.button} !w-[120px] h-[30px] bg-[#57c7a3]`}
                    onClick={() => setOpen(!open)}
                  >
                    Cancel
                  </div>
                  <div
                    className={`${styles.button} !w-[120px] h-[30px] bg-[#d63f3f]`}
                    onClick={handleDelete}
                  >
                    Delete
                  </div>
                </div>
              </Box>
            </Modal>
          )}
        </Box>
      )}
    </div>
  );
};

export default AllUsers;
