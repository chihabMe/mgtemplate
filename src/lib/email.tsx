"use server";
import { Resend } from 'resend';
import ConfirmEmailTemplate from '../../emails/verificatin-email';
import { createElement, ReactElement } from 'react';



const resend = new Resend(process.env.RESEND_API_KEY)

export const sendEmail = ({ to, subject, react }: { to: string, subject: string, react: ReactElement }) =>
    resend.emails.send({
        from: process.env.EMAIL_HOST ?? "",
        to,
        subject,
        react
    })

export const sendVerificationEmail = ({ to, username, verificationLink }: { to: string, verificationLink: string, username: string }) => {
    const subject = "mgtempalte verifiction email"
    const react = createElement(ConfirmEmailTemplate, {
        username, verificationLink
    })
    return sendEmail({
        subject,
        to,
        react
    })
}