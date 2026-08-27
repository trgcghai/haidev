import ContactForm from "@/components/common/contact-form";
import LetterSwapForward from "@/components/fancy/text/letter-swap-forward-anim";

const Contact = () => {
  return (
    <div>
      <h2 id="contact">
        <LetterSwapForward
          label="# Contact"
          reverse={true}
          className="text-lg md:text-2xl font-semibold w-fit text-primary"
        />
      </h2>

      <div className="space-y-2 mt-4">
        <p className="text-secondary-foreground text-sm md:text-base mb-4">
          Feel free to reach out to me via email or connect with me on social
          media. I am always open to new opportunities and collaborations. Or
          just say hi!
        </p>
        <ContactForm />
      </div>
    </div>
  );
};

export default Contact;
