"use client";

import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Submitbutton } from "./SubmitButton";
import { useFormState } from "react-dom";
import { State, UpdateUserSettings } from "../actions";
import { toast } from "sonner";
import { useEffect } from "react";

interface iAppProps {
    firstName: string;
    lastName: string;
    email: string;
}

export function SettingsForm({ firstName, lastName, email }: iAppProps) {
    const initialState: State = { message: "", status: undefined };
    const [state, formAction] = useFormState(UpdateUserSettings, initialState);

    useEffect(() => {
        if(state?.status === 'error'){
            toast.error(state.message);
        } else if (state?.status === 'success'){
            toast.success(state.message);
        }
    }, [state]);

    return (
        <form action={formAction}>
            <CardHeader>
                <CardTitle>Settings</CardTitle>
                <CardDescription>Update your user settings</CardDescription>
                <CardContent className="flex flex-col gap-y-2 pt-4">
                    <div className="flex flex-col gap-y-2 pb-4">
                        <Label>First Name</Label>
                        <Input type="text" name="firstName" defaultValue={firstName} />
                    </div>
                    <div className="flex flex-col gap-y-2 pb-4">
                        <Label>Last Name</Label>
                        <Input type="text" name="lastName" defaultValue={lastName} />
                    </div>
                    <div className="flex flex-col gap-y-2 pb-4">
                        <Label>Email</Label>
                        <Input type="email" name="email" defaultValue={email} disabled />
                    </div>
                </CardContent>
                <CardFooter>
                    <Submitbutton title="Update your settings" />
                </CardFooter>
            </CardHeader>
        </form>
    );
}