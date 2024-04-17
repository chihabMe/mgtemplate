import { getBaseUrl } from "@/utils/url";
import {
    Body,
    Container,
    Column,
    Head,
    Heading,
    Html,
    Img,
    Link,
    Preview,
    Row,
    Section,
    Text,
    Button,
} from "@react-email/components";
import * as React from "react";

interface ConfirmEmailProps {
    verificationLink: string;
    username: string;
}

const baseUrl = getBaseUrl()
export const ConfirmEmailTemplate = ({
    username,
    verificationLink
}: ConfirmEmailProps) => (
    <Html>
        <Head />
        <Preview>Confirm your email address</Preview>
        <Body style={main}>
            <Container style={container}>
                {/* <Section style={logoContainer}>
                </Section> */}
                <Heading style={h1}>Hello {username} confirm your email address</Heading>
                <Text style={heroText}>
                    Your confirmation link is below  click on it  to  to activate your account
                </Text>

                <Button style={button} href={verificationLink}>
                    confirm
                </Button>

                <Text style={text}>
                    If you didn't request this email, there's nothing to worry about, you
                    can safely ignore it.
                </Text>

            </Container>
        </Body>
    </Html>
);

ConfirmEmailTemplate.PreviewProps = {
    username: "chihab",
    verificationLink: "http://localhost:3000/auth/activate/23hgw9ehgtuewoghoj"
} as ConfirmEmailProps;

export default ConfirmEmailTemplate;

const button = {
    backgroundColor: "#656ee8",
    borderRadius: "5px",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "bold",
    textDecoration: "none",
    textAlign: "center" as const,
    display: "block",
    width: "100%",
    padding: "10px",
};


const footerText = {
    fontSize: "12px",
    color: "#b7b7b7",
    lineHeight: "15px",
    textAlign: "left" as const,
    marginBottom: "50px",
};

const footerLink = {
    color: "#b7b7b7",
    textDecoration: "underline",
};

const footerLogos = {
    marginBottom: "32px",
    paddingLeft: "8px",
    paddingRight: "8px",
    width: "100%",
};

const socialMediaIcon = {
    display: "inline",
    marginLeft: "32px",
};

const main = {
    backgroundColor: "#ffffff",
    margin: "0 auto",
    fontFamily:
        "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
};

const container = {
    margin: "0 auto",
    padding: "0px 20px",
};

const logoContainer = {
    marginTop: "32px",
};

const h1 = {
    color: "#1d1c1d",
    fontSize: "36px",
    fontWeight: "700",
    margin: "30px 0",
    padding: "0",
    lineHeight: "42px",
};

const heroText = {
    fontSize: "20px",
    lineHeight: "28px",
    marginBottom: "30px",
};

const codeBox = {
    background: "rgb(245, 244, 245)",
    borderRadius: "4px",
    marginBottom: "30px",
    padding: "40px 10px",
};

const confirmationCodeText = {
    fontSize: "30px",
    textAlign: "center" as const,
    verticalAlign: "middle",
};

const text = {
    color: "#000",
    fontSize: "14px",
    lineHeight: "24px",
};