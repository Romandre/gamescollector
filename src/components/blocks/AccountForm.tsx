"use client";
import { useCallback, useEffect, useState } from "react";
import { supabaseClient } from "@/utils/supabase/client";
import { type User } from "@supabase/supabase-js";

// Components
import { Button, Input } from "../design";

// Utils
import { validateUsername } from "@/utils/credentialsValidation";

// Styles
import { css } from "../../../styled-system/css";

// Icons
import { IoPerson } from "react-icons/io5";
import { MdErrorOutline } from "react-icons/md";

export function AccountForm({ user }: { user: User | null }) {
  const supabase = supabaseClient();
  const [titleName, setTitleName] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [fullname, setFullname] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [website, setWebsite] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const inputClass = `search ${css({ w: "300px", h: `50px`, px: 2 })}`;

  const toggleEditing = () => {
    setIsEditMode(!isEditMode);
  };

  const getUser = useCallback(async () => {
    try {
      setLoading(true);

      const { data, error, status } = await supabase
        .from("profiles")
        .select(`full_name, username, website, avatar_url`)
        .eq("id", user?.id)
        .single();

      if (error && status !== 406) {
        console.log(error);
        throw error;
      }

      if (data) {
        setFullname(data.full_name);
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
        setTitleName(data.username);
      }
    } catch (error) {
      alert("Error loading user data!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

  async function updateUser({
    username,
    fullname,
    website,
    avatarUrl,
  }: {
    username: string | null;
    fullname: string | null;
    website: string | null;
    avatarUrl: string | null;
  }) {
    if (!username) {
      setErrorMessage("Username cannot be empty.");
      return;
    }

    if (username && !validateUsername(username)) {
      setErrorMessage(
        "Username can be minimum 5 and up to 18 characters long and must not include special characters."
      );
      return;
    }

    try {
      setLoading(true);

      const { error } = await supabase.from("profiles").upsert({
        id: user?.id as string,
        full_name: fullname,
        username,
        website,
        avatar_url: avatarUrl,
        updated_at: new Date().toISOString(),
      });

      if (error) throw error;
      //alert("User was updated!");
    } catch (error) {
      alert("Error updating the data!");
      console.log(error);
    } finally {
      setErrorMessage("");
      getUser();
    }
  }

  useEffect(() => {
    getUser();
  }, [user, getUser]);

  return loading ? (
    <div
      className={css({
        display: "flex",
        w: "full",
        h: "220px",
        justifyContent: "center",
        alignItems: "center",
      })}
    >
      <span className={`loader ${css({ scale: 1.2 })}`} />
    </div>
  ) : (
    <div
      className={css({
        my: { base: 2, md: 5 },
        borderRadius: 10,
        opacity: 1,
        transition: "opacity 0.4s",
        animation: "fade-in 0.6s",
      })}
    >
      <div
        className={css({
          position: "relative",
          display: "flex",
          alignItems: "baseline",
          lineHeight: 1,
          gap: 2,
        })}
      >
        <IoPerson
          size={40}
          className={css({
            position: "relative",
            top: "3px",
          })}
        />
        <div
          className={css({
            fontFamily: "var(--font-outfit-sans)",
            fontSize: { base: 38, md: 46 },
          })}
        >
          {titleName}
        </div>
        <div
          className={css({
            ml: 2,
            color: "{colors.primary}",
            fontSize: 15,
            textDecoration: "underline",
            cursor: "pointer",
          })}
          onClick={toggleEditing}
        >
          edit
        </div>
      </div>
      <div className={css({ mt: { base: 3, md: 6 } })}>
        <div>{user?.email}</div>
        {!isEditMode ? (
          <>
            {!!fullname && <div>{fullname}</div>}

            <form
              action="/auth/signout"
              method="post"
              className={css({ mt: 4 })}
            >
              <Button
                className={`secondary ${css({ w: "100px", maxH: "38px" })}`}
                type="submit"
              >
                Sign out
              </Button>
            </form>
          </>
        ) : (
          <>
            <input id="email" type="text" value={user?.email} disabled hidden />
            <div className={css({ mt: 5 })}>
              <Input
                type="text"
                value={username || ""}
                label="username"
                name="username"
                placeholder={username || "Enter username"}
                onChange={(val) => setUsername(val)}
                className={inputClass}
              />
            </div>
            <div className={css({ mt: 5 })}>
              <Input
                type="text"
                value={fullname || ""}
                label="Full name"
                name="fullName"
                placeholder={fullname || "Enter you full name"}
                onChange={(val) => setFullname(val)}
                className={inputClass}
              />
            </div>
            {!!errorMessage && (
              <div
                className={css({
                  display: "flex",
                  alignItems: "center",
                  mt: 2,
                  gap: 2,
                  animation: "fade-in 0.4s",
                })}
              >
                <MdErrorOutline size={24} className={css({ flexShrink: 0 })} />
                <span>{errorMessage}</span>
              </div>
            )}
            <div className={css({ display: "flex", gap: 4 })}>
              <Button
                className={css({ w: "100px", maxH: "38px", mt: 5 })}
                onClick={() =>
                  updateUser({
                    fullname,
                    username,
                    website,
                    avatarUrl,
                  })
                }
                disabled={loading}
              >
                Update
              </Button>
              <Button
                className={`secondary ${css({ w: "100px", maxH: "38px", mt: 5 })}`}
                onClick={toggleEditing}
              >
                Cancel
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
