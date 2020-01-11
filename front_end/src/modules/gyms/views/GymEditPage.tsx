import React from "react";
import * as ReactRouter from "react-router";
import { useGymsContext } from "../../../context/gyms/gymsStore";
import { useUserContext } from "../../../context/user/userStore";
import { Routes } from "../../../routes";
import { Gym } from "../../../types";
import * as RegexUtils from "../../../utils/regexUtils";
import Button from "../../common/buttons/ButtonSecondary";
import Form from "../../common/forms/Form";
import Input from "../../common/inputs/Input";

const GymEditPage: React.FunctionComponent = () => {
  const history = ReactRouter.useHistory();
  const [gymId] = React.useState<string | undefined>(
    history.location.pathname
      .split("/")
      .splice(-1)
      .pop()
  );
  const [gym, setGym] = React.useState<Gym>({} as Gym);
  const [name, setName] = React.useState<string>("");
  const [website, setWebsite] = React.useState<string>("");
  const [websiteMessage, setWebsiteMessage] = React.useState<string>("");
  const [address, setAddress] = React.useState<string>("");
  const [addressMessage, setAddressMessage] = React.useState<string>("");
  const [city, setCity] = React.useState<string>("");
  const [cityMessage, setCityMessage] = React.useState<string>("");
  const [state, setState] = React.useState<string>("");
  const [stateMessage, setStateMessage] = React.useState<string>("");
  const [zipCode, setZipCode] = React.useState<string>("");
  const [zipCodeMessage, setZipCodeMessage] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [emailMessage, setEmailMessage] = React.useState<string>("");
  const [phoneNumber, setPhoneNumber] = React.useState<string>("");
  const [phoneNumberMessage, setPhoneNumberMessage] = React.useState<string>(
    ""
  );

  const { state: gymsState, dispatch: gymsDispatch } = useGymsContext();
  const { state: userState, dispatch: userDispatch } = useUserContext();

  React.useEffect(() => {
    const tempGym = gymsState.gyms
      .filter((element) => element.id === gymId)
      .pop();

    const { user } = userState;

    if (
      tempGym &&
      user &&
      tempGym.authorizedEditors &&
      tempGym.authorizedEditors.find(
        (editorId: string) => editorId === user.userId
      )
    ) {
      setGym(tempGym);
    } else {
      history.push(Routes.GYMS + "/" + gymId);
    }
  });

  React.useEffect(() => {
    if (RegexUtils.containsSpecialCharacter(address)) {
      setAddressMessage("Addresses cannot contain special characters.");
    } else if (RegexUtils.containsNumber(address)) {
      setStateMessage("Cite cannot contain numbers.");
    }
  }, [address]);

  React.useEffect(() => {
    if (RegexUtils.containsSpecialCharacter(city)) {
      setCityMessage("Cities cannot contain special characters.");
    } else if (RegexUtils.containsNumber(city)) {
      setStateMessage("Cite cannot contain numbers.");
    }
  }, [city]);

  React.useEffect(() => {
    if (RegexUtils.containsSpecialCharacter(state)) {
      setStateMessage("States cannot contain special characters.");
    } else if (RegexUtils.containsNumber(state)) {
      setStateMessage("States cannot contain numbers.");
    }
  }, [state]);

  React.useEffect(() => {
    if (!RegexUtils.containsOnlyNumbers(zipCode)) {
      setZipCodeMessage("Zip codes can only have numbers.");
    }
  }, [zipCode]);

  const handleChange = async (event: any): Promise<void> => {
    event.preventDefault();
    const { id, value } = event.target;

    switch (id) {
      case "name":
        setName(value);
        return;
      case "website":
        setWebsite(value);
        return;
      case "address":
        setAddress(value);
        return;
      case "city":
        setCity(value);
        return;
      case "state":
        setState(value);
        return;
      case "zipCode":
        setZipCode(value);
        return;
      case "email":
        setEmail(value);
        return;
      case "phoneNumber":
        setPhoneNumber(value);
        return;

      default:
        return;
    }
  };

  const handleSubmit = async (event: any): Promise<void> => {
    event.preventDefault();

    // tslint:disable: no-console
    console.log(name);
    console.log(email);
    console.log(website);
    console.log(address);
    console.log(city);
    console.log(state);
    console.log(zipCode);
    console.log(phoneNumber);
  };

  const handleCancel = async (event: any): Promise<void> => {};

  const FormInputs: JSX.Element = (
    <React.Fragment>
      <Input
        placeholder="Name"
        id="name"
        value={name}
        handleChange={handleChange}
        type="text"
        autoComplete="organization"
        autoCapitalize="true"
      />
      <Input
        placeholder="Website"
        id="website"
        value={website}
        handleChange={handleChange}
        type="text"
        autoComplete="website"
        helpText={websiteMessage}
      />
      <Input
        placeholder="Address"
        id="address"
        value={address}
        handleChange={handleChange}
        type="text"
        autoComplete="street-address"
        helpText={addressMessage}
      />
      <Input
        placeholder="City"
        id="city"
        value={city}
        handleChange={handleChange}
        type="text"
        autoComplete="city"
        autoCapitalize="true"
        helpText={cityMessage}
      />
      <Input
        placeholder="State"
        id="state"
        value={state}
        handleChange={handleChange}
        type="text"
        autoComplete="state"
        autoCapitalize="true"
        helpText={stateMessage}
      />
      <Input
        placeholder="Zip Code"
        id="zipCode"
        value={zipCode}
        handleChange={handleChange}
        type="text"
        autoComplete="zip-code"
        helpText={zipCodeMessage}
      />
      <Input
        placeholder="Email"
        id="email"
        value={email}
        handleChange={handleChange}
        type="text"
        autoComplete="email"
        helpText={emailMessage}
      />
      <Input
        placeholder="Phone Number"
        id="phoneNumber"
        value={phoneNumber}
        handleChange={handleChange}
        type="text"
        autoComplete="phone-number"
        helpText={phoneNumberMessage}
      />
    </React.Fragment>
  );

  const FormHead: JSX.Element = (
    <div style={{ display: "inline" }}>
      <div style={{ float: "left", marginRight: "25px", marginTop: "5px" }}>
        Update Gym
      </div>
      <div style={{ float: "right", marginLeft: "25px" }}>
        <Button onClick={handleCancel} type="button" variant="outlined">
          Cancel
        </Button>
      </div>
    </div>
  );

  return (
    <Form
      buttonText={"Save"}
      formInputs={FormInputs}
      handleSubmit={handleSubmit}
      title={FormHead}
    />
  );
};

export default GymEditPage;