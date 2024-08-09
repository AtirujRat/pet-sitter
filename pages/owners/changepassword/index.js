import { ButtonOrange } from "@/components/buttons/OrangeButtons";
import SideBarOwners from "@/components/owners/SideBarOwners";
import { useEffect } from "react";
import { useOwnersAccountState } from "@/context/OwnersAccountState";
import { Formik, Form, Field, ErrorMessage } from "formik";

const validateRequired = (value) => (!value ? "Required" : undefined);

export default function ChangePasswordPage() {
  const { changeAccountStateHandle } = useOwnersAccountState();

  useEffect(() => {
    changeAccountStateHandle("changepassword");
  }, [changeAccountStateHandle]);

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Password change values:", values);

    setTimeout(() => {
      setSubmitting(false);
    }, 1000);
  };

  return (
    <section className="w-full h-full bg-ps-gray-100 max-md:pt-0 lg:pt-10 pb-20 max-md:pb-0">
      <div className="max-w-[1440px] min-w-0 lg:flex lg:justify-between mx-auto max-lg:flex-col lg:items-start lg:px-20 gap-9">
        <SideBarOwners />
        <div className="bg-ps-white max-sm:bg-ps-gray-100 rounded-2xl max-lg:rounded-none w-[956px] min-h-[824px] max-lg:w-full max-md:mx-auto max-sm:w-full max-md:min-h-[678px] max-lg:shadow-none p-10 max-sm:px-2 flex flex-col shadow-md gap-12">
          <p className="text-h3">Change Password</p>
          <Formik
            initialValues={{
              currentPassword: "",
              newPassword: "",
              confirmPassword: "",
            }}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col gap-6 mx-10">
                {/* current password */}
                <div className="flex flex-col">
                  <label
                    htmlFor="currentPassword"
                    className="text-[16px] font-bold pb-1 flex"
                  >
                    Current Password*
                    <ErrorMessage
                      name="currentPassword"
                      component="div"
                      className="text-ps-red text-b3"
                    />
                  </label>
                  <Field
                    type="text"
                    id="currentPassword"
                    name="currentPassword"
                    validate={validateRequired}
                    className="border-[#DCDFED] text-[#7B7E8F] rounded-lg"
                    placeholder="Current Password"
                  />
                </div>

                {/* new password */}
                <div className="flex flex-col">
                  <label
                    htmlFor="newPassword"
                    className="text-[16px] font-bold pb-1 flex"
                  >
                    New Password*
                    <ErrorMessage
                      name="newPassword"
                      component="div"
                      className="text-ps-red text-b3"
                    />
                  </label>
                  <Field
                    type="text"
                    id="newPassword"
                    name="newPassword"
                    validate={validateRequired}
                    className="border-[#DCDFED] text-[#7B7E8F] rounded-lg"
                    placeholder="New Password"
                  />
                </div>

                {/* confirm password */}
                <div className="flex flex-col">
                  <label
                    htmlFor="confirmPassword"
                    className="text-[16px] font-bold pb-1 flex"
                  >
                    Confirm Password*
                    <ErrorMessage
                      name="confirmPassword"
                      component="div"
                      className="text-ps-red text-b3"
                    />
                  </label>
                  <Field
                    type="text"
                    id="confirmPassword"
                    name="confirmPassword"
                    validate={validateRequired}
                    className="border-[#DCDFED] text-[#7B7E8F] rounded-lg"
                    placeholder=" Confirm Password"
                  />
                </div>
                <ButtonOrange
                  id="button name"
                  text="Change Password"
                  width="w-fit"
                />
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </section>
  );
}
