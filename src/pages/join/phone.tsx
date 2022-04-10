import type { NextPage } from "next";
import { ChangeEventHandler, FormEventHandler, useState } from "react";
import Link from "next/link";
import Title from "../../components/title";
import callingCodeList from "../../../lib/callingCodeList";
import { NextRouter, useRouter } from "next/router";

const SMSAccessToken = process.env.NEXT_PUBLIC_SMS_ACCESS_TOKEN;

const PhoneJoin: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [verificationCodeSended, setVerificationCodeSended] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [callingCode, setCallingCode] = useState(1);
  const [name, setName] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router: NextRouter = useRouter();

  const setError = (message: string) => {
    setErrorMessage(message);
    setVerificationCodeSended(false);
  };
  const getWholePhoneNumber = () => {
    const wholePhoneNumber: string = `+${callingCode}${phoneNumber}`;
    return wholePhoneNumber;
  };
  const initError = () => setErrorMessage("");

  const sendSMS = async () => {
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
    setVerificationCodeSended(sended);
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
  const sendVerificationCode: FormEventHandler<HTMLFormElement> = async (event) => {
    setIsLoading(true);
    event.preventDefault();
    initError();
    const userExists = await checkExistingUser();
    if (userExists) {
      setIsLoading(false);
      return setError("The Account already Exists.");
    }
    await sendSMS();
    setIsLoading(false);
  };

  const confirmCode = async () => {
    const wholePhoneNumber = getWholePhoneNumber();
    const confirmInformation = JSON.stringify({
      wholePhoneNumber,
      verificationCode,
    });
    const { isCodeCorrect } = await (
      await fetch("/api/confirm", {
        method: "POST",
        body: confirmInformation,
      })
    ).json();
    return isCodeCorrect;
  };
  const join = async () => {
    const wholePhoneNumber = getWholePhoneNumber();
    const { success } = await (
      await fetch("/api/join", {
        method: "POST",
        body: JSON.stringify({
          wholePhoneNumber,
          name,
        }),
      })
    ).json();
    if (!success) {
      return setError("Joining Error. Please try again.");
    }
  };
  const handlePhoneJoin: FormEventHandler<HTMLFormElement> = async (event) => {
    setIsLoading(true);
    event.preventDefault();
    const isCodeCorrect = await confirmCode();
    if (!isCodeCorrect) {
      return setError("Code Incorrect.");
    }
    await join();
    await router.push("/login/phone");
    setIsLoading(false);
  };

  const goBack = () => setVerificationCodeSended(false);

  const onSelectCountry: ChangeEventHandler<HTMLSelectElement> = (event) =>
    setCallingCode(Number(event.target.value));
  const handlePhoneNumberChange: ChangeEventHandler<HTMLInputElement> = (event) =>
    setPhoneNumber(event.target.value);
  const handleNameChange: ChangeEventHandler<HTMLInputElement> = (event) =>
    setName(event.target.value);
  const handleVerificationCodeChange: ChangeEventHandler<HTMLInputElement> = (event) =>
    setVerificationCode(event.target.value);
  return (
    <div>
      <Title title="Join" />
      <form
        onSubmit={verificationCodeSended ? handlePhoneJoin : sendVerificationCode}
        className="form mt-60"
      >
        {errorMessage !== "" ? <span className="error">{errorMessage}</span> : null}
        {verificationCodeSended ? (
          <div className="flex flex-col mt-3">
            <i
              onClick={goBack}
              className="fa-solid fa-arrow-left text-white hidden cursor-pointer ml-3"
            ></i>
            <input
              type="text"
              placeholder="Enter the Verification Code."
              className="input"
              value={verificationCode}
              onChange={handleVerificationCodeChange}
              required
            />
          </div>
        ) : (
          <div className="flex flex-col mt-3">
            <div className="mx-3 rounded border border-zinc-800 p-3">
              <select
                value={callingCode}
                onChange={onSelectCountry}
                className="bg-black focus:outline-none opacity-80 font-light text-white text-sm w-full cursor-pointer"
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
              onChange={handlePhoneNumberChange}
              value={phoneNumber}
            />
            <input
              type="text"
              placeholder="Type your Name."
              className="input"
              value={name}
              onChange={handleNameChange}
            />
          </div>
        )}

        <button type="submit" className="continue-button" disabled={isLoading}>
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
        <Link href="/join/email">
          <a className="text-white text-sm ml-7 opacity-70 font-light mb-3">
            Join with your Email &rarr;
          </a>
        </Link>
      </form>
    </div>
  );
};

export default PhoneJoin;
