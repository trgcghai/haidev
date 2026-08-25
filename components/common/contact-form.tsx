"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

const ContactForm = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("Form submitted: ", formValues);
  };

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="name" className="text-sm font-medium">
        Name:
      </Label>
      <Input
        id="name"
        name="name"
        type="text"
        placeholder="Your name"
        value={formValues.name}
        onChange={handleInputChange}
      />
      <Label htmlFor="email" className="text-sm font-medium">
        Email:
      </Label>
      <Input
        id="email"
        name="email"
        type="email"
        placeholder="your.email@example.com"
        value={formValues.email}
        onChange={handleInputChange}
      />
      <Label htmlFor="message" className="text-sm font-medium">
        Message:
      </Label>
      <Textarea
        id="message"
        name="message"
        placeholder="Your message here..."
        value={formValues.message}
        onChange={handleInputChange}
      />
      <Button type="submit" className="mt-2" onClick={handleSubmit}>
        Send
      </Button>
    </div>
  );
};

export default ContactForm;
