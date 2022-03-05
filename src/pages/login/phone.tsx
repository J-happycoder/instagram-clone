import type { NextPage } from "next";
import { useState } from "react";
import Link from "next/link";
import Title from "../../components/title";
import callingCodeList from "../../../lib/callingCodeList";
import { unknown, userNotFound } from "../../../lib/errorTypes";
import useUser from "../../../lib/useUser";

const SMSAccessToken = process.env.NEXT_PUBLIC_SMS_ACCESS_TOKEN;

const PhoneLogin: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [verificationCodeSended, setVerificationCodeSended] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [callingCode, setCallingCode] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");

  const { user, mutateUser } = useUser();

  const setError = (message: string) => {
    setErrorMessage(message);
    setVerificationCodeSended(false);
  };

  const getWholePhoneNumber = () => {
    const wholePhoneNumber = `+${callingCode}${phoneNumber}`;
    return wholePhoneNumber;
  };

  const sendSMSAndReturnSended = async () => {
    const wholePhoneNumber = getWholePhoneNumber();
    const SMSInformation = JSON.stringify({
      SMSAccessToken,
      wholePhoneNumber,
    });
    const { sended } = await (
      await fetch("/api/sms", {
        method: "POST",
        body: SMSInformation,
      })
    ).json();
    return sended;
  };
  const checkExistingUser = async () => {
    const wholePhoneNumber = getWholePhoneNumber();
    const { exists } = await (
      await fetch("/api/user/exists", {
        method: "POST",
        body: JSON.stringify({
          wholePhoneNumber,
        }),
      })
    ).json();
    return exists;
  };
  const sendVerificationCode = async (event: any) => {
    setIsLoading(true);
    event.preventDefault();
    setErrorMessage("");
    const exists = await checkExistingUser();
    if (!exists) {
      return setError("The user does not Exist.");
    }
    const sended = await sendSMSAndReturnSended();
    setVerificationCodeSended(sended);
    setIsLoading(false);
  };

  const confirmCode = async () => {
    const wholePhoneNumber = getWholePhoneNumber();
    const { isCodeCorrect } = await (
      await fetch("/api/confirm", {
        method: "POST",
        body: JSON.stringify({
          wholePhoneNumber,
          verificationCode,
        }),
      })
    ).json();
    return isCodeCorrect;
  };
  const login = async () => {
    const wholePhoneNumber = getWholePhoneNumber();
    const { error } = await (
      await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify({
          wholePhoneNumber,
        }),
      })
    ).json();
    if (error === unknown) {
      return setError("Fail to Log In.");
    }
    const { user } = await (await fetch("/api/user")).json();
    mutateUser(user);
  };
  const handlePhoneLogin = async (event: any) => {
    setIsLoading(true);
    event.preventDefault();
    const isCodeCorrect = await confirmCode();
    if (!isCodeCorrect) {
      return setError("Incorrect Code.");
    }
    await login();
    setIsLoading(false);
  };

  const handleBack = () => {
    setVerificationCodeSended(false);
  };

  const handlePhoneNumberChange = (event: any) => setPhoneNumber(event.target.value);
  const handleVerificationCodeChange = (event: any) => setVerificationCode(event.target.value);
  const onSelectCountry = (event: any) => setCallingCode(event.target.value);
  return (
    <div>
      <Title title="Join" />
      <form
        onSubmit={verificationCodeSended ? handlePhoneLogin : sendVerificationCode}
        className="form"
      >
        {errorMessage !== "" ? (
          <span className="text-white text-sm mx-3 p-3 my-3 rounded border border-red-500">
            {errorMessage}
          </span>
        ) : null}
        {verificationCodeSended ? (
          <div>
            <i
              onClick={handleBack}
              className="fa-solid fa-arrow-left text-white hidden cursor-pointer ml-3"
            ></i>
            <input
              type="text"
              placeholder="Type the Verification Code."
              className="input w-full"
              required
              value={verificationCode}
              onChange={handleVerificationCodeChange}
            />
          </div>
        ) : (
          <div className="flex flex-col">
            <div className="mx-3 rounded border border-zinc-900 p-3">
              <select
                value={callingCode}
                onChange={onSelectCountry}
                className="bg-black focus:outline-none opacity-80 font-light text-white text-sm w-full"
              >
                {callingCodeList.map((callingCodeObj: any, index: number) => (
                  <option key={index} value={callingCodeObj.callingCode}>
                    {callingCodeObj.country} +{callingCodeObj.callingCode}
                  </option>
                ))}
              </select>
            </div>
            <input
              type="text"
              placeholder="Type your Phone Number."
              className="input"
              required
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
            />
          </div>
        )}

        <button type="submit" className="continue-button">
          {isLoading ? (
            <div className="h-5 m-auto flex flex-row justify-center">
              <div>
                <div className="w-5 h-5 rounded-lg bg-white animate-ping absolute"></div>
                <div className="w-5 h-5 rounded-lg bg-white relative opacity-20"></div>
              </div>
              <span className="ml-3">Loading...</span>
            </div>
          ) : (
            <span>Continue</span>
          )}
        </button>
        <Link href="/login/email">
          <a className="text-white text-sm ml-7 opacity-70 font-light">
            Login with your Email &rarr;
          </a>
        </Link>
      </form>
    </div>
  );
};

export default PhoneLogin;
