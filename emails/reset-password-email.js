import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  // Link,
  Preview,
  Row,
  Section,
  Text,
  Tailwind,
  Hr,
} from "@react-email/components";
import * as React from "react";


// http://localhost:3000/longLogo.svg
const baseUrl = process.env.NEXT_PUBLIC_URL
  ? `${process.env.NEXT_PUBLIC_URL}`
  : "http://localhost:3000/";

export const WrappletResetPasswordEmail = (props) => {
  const { resetPasswordLink } = props
  return (
    <Html>
      <Head />
      <Preview>Wrapplet reset your password</Preview>
      <Tailwind>
        <Body className="border border-solid border-[#eaeaea] rounded-md font-sans p-5">
          <Container>
            <Img
              src={`${baseUrl}longLogo.svg`}
              width="40"
              height="33"
              alt="Wrapplet"
            />
            <Section className="text-start">
              <Text className="text-sm">Hi,</Text>
              <Text className="text-sm">
                Someone recently requested a password change for your Wrapplet
                account. If this was you, you can set a new password here:
              </Text>
              <Button className="text-sm px-5 py-2 bg-[#7228bd] text-white rounded-md" href={resetPasswordLink}>
                Reset password
              </Button>
              <Text className="text-sm">
                If you don&apos;t want to change your password or didn&apos;t
                request this, just ignore and delete this message.
              </Text>
              <Text className="text-sm">
                To keep your account secure, please don&apos;t forward this email
                to anyone.
              </Text>
              {/* <Text style={text}>Happy Dropboxing!</Text> */}
            </Section>
          </Container>
          <Hr className="border border-solid border-[#eaeaea] mx-0 w-full" />
          <Section className="max-w-[580px] mx-auto">
            <Row>
              <Text style={{ textAlign: "center", color: "#706a7b" }}>
                © 2022 Wrapplet, All Rights Reserved <br />
              </Text>
            </Row>
          </Section>
        </Body>
      </Tailwind>
    </Html>
  );
};
