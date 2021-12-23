import React, { useState } from 'react';
import { Alert, Button, Form, Fieldset, Label, TextInput } from '@trussworks/react-uswds';

enum RequestStatus {
  IDLE,
  LOADING,
  SUCCESS,
  ERROR_NOT_ACCEPTABLE,
  ERROR_BAD_REQUEST,
}

const ERROR_CODE_TO_STATUS = new Map([
    [400, RequestStatus.ERROR_BAD_REQUEST],
    [406, RequestStatus.ERROR_NOT_ACCEPTABLE],
]);

const POST_HEADERS = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

function SubscribeForm() {
  const [email, setEmail] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");

  const [requestStatus, setRequestStatus] = useState<RequestStatus>(RequestStatus.IDLE);
  const [subscribedEmail, setSubscribedEmail] = useState<string | undefined>(undefined);

  const [isUnsubscribing, setIsUnsubscribing] = useState<boolean>(false);

  const POST_URL = isUnsubscribing ? "/unsubscribe" : "/subscribe";

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setRequestStatus(RequestStatus.LOADING);
    fetch(POST_URL, {
      method: 'POST',
      headers: POST_HEADERS,
      body: JSON.stringify({email, firstName, lastName})
    })
    .then(response => {
        const requestStatus = ERROR_CODE_TO_STATUS.get(response.status);
        if (requestStatus != null) {
            setRequestStatus(requestStatus);
            throw new Error(`API returned error status ${response.status}`);
        }

        setSubscribedEmail(email);
        setEmail("");
        setFirstName("");
        setLastName("");
        setRequestStatus(RequestStatus.SUCCESS);
    })
    .catch(error => console.error(error.message));
  }

  function onChangeEmail(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
  }

  function onChangeFirstName(event: React.ChangeEvent<HTMLInputElement>) {
    setFirstName(event.target.value);
  }

  function onChangeLastName(event: React.ChangeEvent<HTMLInputElement>) {
    setLastName(event.target.value);
  }

  function toggleSubscribeMode() {
    setIsUnsubscribing(prevVal => !prevVal);
    setRequestStatus(RequestStatus.IDLE);
  }

  let alertOrButton = null;
  switch(requestStatus) {
    case RequestStatus.SUCCESS:
        alertOrButton = (
        <Alert type="success" heading="Success!">
            You have {isUnsubscribing ? "unsubscribed" : "subscribed"} for the RPNS with {subscribedEmail}.
        </Alert>
        );
        break;
    case RequestStatus.ERROR_NOT_ACCEPTABLE:
        alertOrButton = (
        <Alert type="warning" heading="Unsuccessful">
            {isUnsubscribing ? 
                `You are not currently subscribed with ${email}.` : 
                `You have already subscribed for the RPNS with ${email}.`
            }
        </Alert>
        );
        break;
    case RequestStatus.ERROR_BAD_REQUEST:
        alertOrButton = (
            <Alert type="error" heading="Unsuccessful">
                Please make sure the form is filled out and try again.
            </Alert>
        );
        break;
    default:
        alertOrButton = (
            <Button type="submit" disabled={requestStatus === RequestStatus.LOADING}>
                {isUnsubscribing ? "Unsubscribe" : "Subscribe"}
            </Button>
        );
  }

  return (
    <Form onSubmit={handleSubmit}>
        <Fieldset legend={isUnsubscribing ? "Unsubscribe from RPNS" : "Sign Up for RPNS"} legendStyle="large">
            <p>
                <abbr title="required" className="usa-hint usa-hint--required">
                    *
                </abbr>{' '}
                indicates a required field.
            </p>
            <Label htmlFor="email">
                Email address{' '}
                <abbr title="required" className="usa-label--required">
                    *
                </abbr>
            </Label>
            <TextInput
                id="email"
                name="email"
                type="email"
                autoCapitalize="off"
                autoCorrect="off"
                required={true}
                value={email}
                onChange={onChangeEmail}
            />
            <Label htmlFor="first-name">
                First Name{' '}
                <abbr title="required" className="usa-label--required">
                    *
                </abbr>
            </Label>
            <TextInput
                id="first-name"
                name="firstName"
                type="text"
                required={true}
                value={firstName}
                onChange={onChangeFirstName}
            />

            <Label htmlFor="last-name">
                Last Name{' '}
                <abbr title="required" className="usa-label--required">
                    *
                </abbr>
            </Label>
            <TextInput
                id="last-name"
                name="lastName"
                type="text"
                required={true}
                value={lastName}
                onChange={onChangeLastName}
            />
            {alertOrButton}
            <p>
                <Button onClick={toggleSubscribeMode} type="button" unstyled>
                    <strong>{isUnsubscribing ? "Subscribe" : "Unsubscribe"}</strong>
                </Button>
            </p>
        </Fieldset>
    </Form>
  );
}

export default SubscribeForm;