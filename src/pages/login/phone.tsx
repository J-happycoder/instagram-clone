import type { NextPage } from "next";
import { ChangeEventHandler, FormEventHandler, useState } from "react";
import Link from "next/link";
import Title from "../../components/title";
import callingCodeList from "../../../lib/callingCodeList";
import useUser from "../../../lib/useUser";
import { NextRouter, useRouter } from "next/router";

const SMSAccessToken = process.env.NEXT_PUBLIC_SMS_ACCESS_TOKEN;

const PhoneLogin: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [verificationCodeSended, setVerificationCodeSended] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [callingCode, setCallingCode] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");
  const router: NextRouter = useRouter();

  const { mutateUser } = useUser();

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
    const exists = await checkExistingUser();
    if (!exists) {
      setError("The user does not Exist.");
      return setIsLoading(false);
    }
    await sendSMS();
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
    await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({
        wholePhoneNumber,
      }),
    });
    const { user } = await (await fetch("/api/user")).json();
    mutateUser(user);
  };
  const handlePhoneLogin: FormEventHandler<HTMLFormElement> = async (event: any) => {
    setIsLoading(true);
    event.preventDefault();
    const isCodeCorrect = await confirmCode();
    if (!isCodeCorrect) {
      setError("Incorrect Code.");
      return setIsLoading(false);
    }
    await login();
    await router.push("/");
    setIsLoading(false);
  };

  const goBack = () => setVerificationCodeSended(false);

  const handlePhoneNumberChange: ChangeEventHandler<HTMLInputElement> = (event) =>
    setPhoneNumber(event.target.value);
  const handleVerificationCodeChange: ChangeEventHandler<HTMLInputElement> = (event) =>
    setVerificationCode(event.target.value);
  const onSelectCountry: ChangeEventHandler<HTMLSelectElement> = (event) =>
    setCallingCode(Number(event.target.value));
  return (
    <div>
      <Title title="Join" />
      <form
        onSubmit={verificationCodeSended ? handlePhoneLogin : sendVerificationCode}
        className="form mt-60"
      >
        {errorMessage !== "" ? <span className="error">{errorMessage}</span> : null}
        {verificationCodeSended ? (
          <div className="flex flex-col">
            <i
              onClick={goBack}
              className="fa-solid fa-arrow-left text-white hidden cursor-pointer ml-3"
            ></i>
            <input
              type="text"
              placeholder="Type the Verification Code."
              className="input"
              required
              value={verificationCode}
              onChange={handleVerificationCodeChange}
            />
          </div>
        ) : (
          <div className="flex flex-col">
            <div className="mx-3 border border-zinc-800 p-3">
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
