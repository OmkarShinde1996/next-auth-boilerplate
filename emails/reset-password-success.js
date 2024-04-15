import {
  Body,
  Container,
  Column,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
  Tailwind,
  Hr
} from "@react-email/components";
import * as React from "react";
// http://localhost:3000/longLogo.svg
const baseUrl = process.env.NEXT_PUBLIC_URL
  ? `${process.env.NEXT_PUBLIC_URL}`
  : "http://localhost:3000/";

export const WrappletResetPasswordSuccessEmail = (props) => {
  const { resetPassUrl, supportUrl, updatedDate } = props;
  const formattedDate = new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "medium",
  }).format(updatedDate);

  return (
    <Html>
      <Head />
      <Preview>You updated the password for your Wrapplet account</Preview>
      <Tailwind>
        <Body className="border border-solid border-[#eaeaea] rounded-md font-sans p-5">
          <Container>
            <Section>
              <Img
                src={`${baseUrl}longLogo.svg`}
                width="40"
                height="33"
                alt="Wrapplet"
              />
            </Section>
            <Section className="text-start">
              <Text className="text-start">Hi,</Text>
              <Text className="text-start">
                You updated the password for your Wrapplet account on{" "}
                {formattedDate}. If this was you, then no further action is
                required.
              </Text>
              <Text className="text-start">
                However if you did NOT perform this password change, please{" "}
                <Link href={resetPassUrl} className="underline">
                  reset your account password
                </Link>{" "}
                immediately.
              </Text>
              <Text className="text-start">
                Remember to use a password that is both strong and unique for your
                Wrapplet account.
              </Text>
              <Text className="text-start">
                Still have questions? Please contact{" "}
                <Link href={supportUrl} className="underline">
                  Wrapplet Support
                </Link>
              </Text>
              <Text className="text-start">
                Thanks,
                <br />
                Wrapplet Support Team
              </Text>
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
