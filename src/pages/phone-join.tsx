import type { NextPage } from "next";
import { useState } from "react";
import { countries } from "country-data-list";
import Head from "next/head";
import Header from "../components/header";
import Fontawesome from "../components/fontawesome";
import Input from "../components/input";
import Link from "next/link";

const password = process.env.NEXT_PUBLIC_SMS_PASSWORD;

const Join: NextPage = () => {
  const [countryCode, setCountryCode] = useState("US");
  const [isLoading, setIsLoading] = useState(false);
  const [verificationCodeSended, setVerificationCodeSended] = useState(false);
  const [wholePhoneNumber, setPhoneNumber] = useState("");

  const formatCountry = (country: any) => {
    const formattedCountry = country.map((country: any) => {
      const { name } = country;
      const identifierCode = country.alpha2;
      const callingCodes = country.countryCallingCodes;
      const mainCallingCode = callingCodes[0].split(" ")[0];
      return { name, identifierCode, callingCode: mainCallingCode };
    });
    return formattedCountry;
  };
  const countriesThatHaveCallingCode = countries.all.filter((country: any) => {
    const callingCodeExists = country.countryCallingCodes.length !== 0;
    return callingCodeExists;
  });
  const formattedCountries = formatCountry(countriesThatHaveCallingCode);

  const onSelectCountry = (event: any) => {
    const selectedCountryCode = event.target.value;
    setCountryCode(selectedCountryCode);
  };

  const getCallingCode = () => {
    let callingCode;
    formattedCountries.forEach((country: any) => {
      if (countryCode === country.identifierCode) {
        callingCode = country.callingCode;
      }
    });
    return callingCode;
  };
  const sendVerificationCode = async (event: any) => {
    event.preventDefault();
    const phoneNumberInput: any = document.querySelector(".phoneNumberInput");
    const nameInput: any = document.querySelector(".nameInput");
    const name = nameInput.value;
    const phoneNumber = phoneNumberInput.value;
    const callingCode = getCallingCode();
    const wholePhoneNumber = callingCode + phoneNumber;
    setPhoneNumber(wholePhoneNumber);
    const requestInformation = JSON.stringify({
      password,
      wholePhoneNumber,
    });
    setIsLoading(true);
    const { sended } = await (
      await fetch("/api/sms", {
        method: "POST",
        body: requestInformation,
      })
    ).json();
    phoneNumberInput.value = "";
    setIsLoading(false);
    setVerificationCodeSended(sended);
  };
  const handlePhoneJoin = async (event: any) => {
    event.preventDefault();
    const verificationCodeInput: any = document.querySelector(".verificationCodeInput");
    const enteredVerificationCode = verificationCodeInput.value;
    const { codeCorrect } = await (
      await fetch("/api/compare", {
        method: "POST",
        body: JSON.stringify({
          wholePhoneNumber,
          enteredVerificationCode,
        }),
      })
    ).json();
    if (codeCorrect) {
      // Log the User
      console.log("Log In!!!");
    } else {
      console.log("error");
    }
  };
  const handleBack = () => {
    setVerificationCodeSended(false);
  };
  return (
    <div>
      <Head>
        <title>Join | Insatgram</title>
      </Head>
      <Header></Header>
      <Fontawesome />
      <form
        onSubmit={verificationCodeSended ? handlePhoneJoin : sendVerificationCode}
        className="form"
      >
        {verificationCodeSended ? (
          <div>
            <i
              onClick={handleBack}
              className="fa-solid fa-arrow-left text-white hidden cursor-pointer ml-3"
            ></i>
            <Input
              placeholder="Enter the Verification Code."
              type="text"
              className="verificationCodeInput"
            />
          </div>
        ) : (
          <div>
            <div className="mx-3 rounded border border-zinc-900 p-3">
              <select
                defaultValue="US"
                onChange={onSelectCountry}
                className="bg-black focus:outline-none opacity-80 font-light text-white text-sm"
              >
                {callingCodes.map((country: any, index: number) => (
                  <option key={index} value={country.identifierCode}>
                    {country.name} {country.callingCode}
                  </option>
                ))}
              </select>
            </div>
            <Input
              type="text"
              placeholder="Type your Phone Number. (without spaces)"
              className="phoneNumberInput"
              required
            />
            <Input type="text" placeholder="Type your Name." className="nameInput" />
          </div>
        )}

        <button type="submit" className="continue-button">
          {isLoading ? (
            <div className="h-5 m-auto flex flex-row justify-center">
              <div>
                <div className="w-5 h-5 rounded-lg bg-white animate-ping absolute"></div>
                <div className="w-5 h-5 rounded-lg bg-white relative opacity-20"></div>
              </div>
              <span className="ml-3">Sending...</span>
            </div>
          ) : (
            <span>Continue</span>
          )}
        </button>
        <Link href="email-join">
          <span className="text-white cursor-pointer text-sm ml-7 opacity-70 font-light">
            Join with your Email &rarr;
          </span>
        </Link>
      </form>
    </div>
  );
};

export default Join;
