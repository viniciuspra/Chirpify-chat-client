import { ChangeEvent, useEffect, useState } from "react";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { DialogHeader } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { UserType } from "@/components/chats-panel";

import { socket } from "@/services/socket";
import { api } from "@/services/api";

import { toast, ToastContainer } from "react-toastify";
import { toastOptions } from "@/configs/toastOptions";

import { useAppSelector } from "@/redux/hooks";
import { selectAuth } from "@/redux/auth/slice";
import { Pencil } from "lucide-react";

interface ProfilePanelProps extends UserType {
  fullname: string;
}

export function ProfilePanel() {
  const [user, setUser] = useState<ProfilePanelProps | null>(null);
  const [fullname, setFullname] = useState(user?.fullname);
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [oldPasswordError, setOldPasswordError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const AuthUser = useAppSelector(selectAuth);

  const handleOldPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOldPassword(e.target.value);
    setOldPasswordError("");
  };

  const handleNewPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
    setNewPasswordError("");
  };

  const handleSubmit = () => {
    if (fullname && fullname.trim() !== "") {
      api
        .put("/api/user/update", { fullname })
        .then(() =>
          toast.success("Fullname changed successfully.", toastOptions)
        )
        .catch((error) => {
          if (error.response) {
            toast.error(error.response.data.message, toastOptions);
          } else {
            toast.error(
              "Error changing fullname. Please try again.",
              toastOptions
            );
          }
        });
    }

    if (oldPassword.length < 6) {
      setOldPasswordError("Old password must be at least 6 characters long.");
      return;
    }

    if (newPassword.length < 6) {
      setNewPasswordError("New password must be at least 6 characters long.");
      return;
    }

    api
      .put("/api/user/update", { newPassword, oldPassword })
      .then(() => toast.success("Password changed successfully.", toastOptions))
      .catch((error) => {
        if (error.response) {
          toast.error(error.response.data.message, toastOptions);
        } else {
          toast.error(
            "Error changing password. Please try again.",
            toastOptions
          );
        }
      });
  };

  const handleEditClick = () => {
    setIsEditing((prevEdit) => !prevEdit);
  };

  useEffect(() => {
    const handleGetUser = (result: ProfilePanelProps) => {
      setUser(result);
      setFullname(result.fullname);
    };

    socket.emit("getUser", AuthUser?.username);

    socket.on("getUser", handleGetUser);

    return () => {
      socket.off("getUser", handleGetUser);
    };
  }, [AuthUser]);

  return (
    <div className="bg-secondary/70 min-w-[192px] sm:w-[349px] ml-2 rounded-md shadow-lg flex flex-col border">
      <header className="flex items-center justify-between h-24 border-b border-muted px-4 bg-slate-500/10">
        <h1 className="flex items-start gap-2 font-semibold text-3xl">
          Profile
        </h1>
      </header>
      <div className="p-3 flex flex-col">
        <Avatar className="w-24 h-24">
          <AvatarImage src={user?.avatar} />
          <AvatarFallback className="uppercase text-2xl">
            {user && user?.username[0] + user?.username[1]}
          </AvatarFallback>
        </Avatar>
        <div className="mt-4 px-2">
          <p className="text-primary/70">Full Name</p>
          <div className="flex justify-between p-3">
            {!isEditing ? (
              <>
                <p className="text-lg font-semibold">{fullname}</p>
                <Pencil
                  className="hover:bg-primary/20 w-9 h-9 p-2 cursor-pointer rounded-md transition-colors"
                  onClick={handleEditClick}
                />
              </>
            ) : (
              <div className="flex flex-col gap-1 w-full">
                <input
                  type="text"
                  value={fullname}
                  placeholder="Ex: John Doe"
                  autoFocus
                  className="bg-transparent text-lg font-semibold p-2 mb-2"
                  onChange={(e) => setFullname(e.target.value)}
                />
                <div className="flex items-center justify-end gap-4">
                  <button
                    type="button"
                    className="bg-logo p-2 rounded-md font-semibold hover:brightness-110"
                    onClick={handleEditClick}
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end mt-5 gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Edit Password</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Change password</DialogTitle>
                  <DialogDescription>
                    Make changes to your password here. Click save when you're
                    done.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-6 mt-2">
                  <div className="flex flex-col items-center gap-3">
                    <Label htmlFor="old" className="w-full">
                      Old Password
                    </Label>
                    <Input
                      id="old"
                      placeholder="min 6 characters"
                      type="password"
                      onChange={handleOldPasswordChange}
                    />
                    {oldPasswordError && (
                      <p className="text-red-500 text-sm w-full px-2">
                        {oldPasswordError}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Label htmlFor="new" className="w-full">
                      New Password
                    </Label>
                    <Input
                      id="new"
                      placeholder="min 6 characters"
                      type="password"
                      onChange={handleNewPasswordChange}
                    />
                    {newPasswordError && (
                      <p className="text-red-500 text-sm w-full px-2">
                        {newPasswordError}
                      </p>
                    )}
                  </div>
                </div>
                <DialogFooter className="flex items-center">
                  <Button variant={"destructive"} onClick={handleSubmit}>
                    Save changes
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <AlertDialog>
              <AlertDialogTrigger className="inline-flex items-center h-9 px-4 py-2 justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90">
                Save changes
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Are you sure you want to save the changes?
                  </AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleSubmit}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
