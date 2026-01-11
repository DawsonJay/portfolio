import { useState } from 'react';
import styled from 'styled-components';
import emailjs from '@emailjs/browser';
import NavBar from '../../components/article/NavBar';

// Constants
const CONTACT_EMAIL = 'dawsonjames027@gmail.com';
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Layout Components
const PageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  overflow-y: auto;
  background-color: ${(props) => props.theme.colors.surface};
`;

const ContentContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: ${(props) => props.theme.spacing.xl} ${(props) => props.theme.spacing.md};
  padding-top: calc(64px + ${(props) => props.theme.spacing.xl});
  font-family: ${(props) => props.theme.fonts.body};
  color: ${(props) => props.theme.colors.layers.layer11};
  box-sizing: border-box;

  @media (max-width: 600px) {
    padding-left: ${(props) => props.theme.spacing.md};
    padding-right: ${(props) => props.theme.spacing.md};
  }
`;

const CenteredContent = styled(ContentContainer)`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 64px);
`;

// Typography Components
const PageTitle = styled.h1`
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: ${(props) => props.theme.fontSizes['3xl']};
  font-weight: 600;
  line-height: 1.2;
  color: ${(props) => props.theme.colors.layers.layer11};
  margin: 0 0 ${(props) => props.theme.spacing.sm} 0;
  text-align: center;
`;

const Subtitle = styled.p`
  font-size: ${(props) => props.theme.fontSizes.xl};
  color: ${(props) => props.theme.colors.accent};
  text-align: center;
  margin: 0 0 ${(props) => props.theme.spacing.sm} 0;
  font-weight: 600;
`;

// Section Components
const SectionCard = styled.section`
  background: ${(props) => props.theme.colors.surface};
  border: 1px solid ${(props) => props.theme.colors.layers.layer1};
  border-radius: 8px;
  padding: ${(props) => props.theme.spacing.xl};
  margin-bottom: 0;
`;

const SectionTitle = styled.h2`
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: ${(props) => props.theme.fontSizes['2xl']};
  font-weight: 600;
  color: ${(props) => props.theme.colors.layers.layer11};
  margin: 0 0 ${(props) => props.theme.spacing.lg} 0;
`;

const AvailabilityText = styled.p`
  font-size: ${(props) => props.theme.fontSizes.base};
  line-height: 1.6;
  color: ${(props) => props.theme.colors.layers.layer11};
  text-align: center;
  margin: ${(props) => props.theme.spacing.md} 0 0 0;
`;


// Form Components
const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.lg};
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.xs};
`;

const FormLabel = styled.label<{ $required?: boolean }>`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.base};
  font-weight: 600;
  color: ${(props) => props.theme.colors.layers.layer11};
  
  &::after {
    content: ${(props) => (props.$required ? ' " *"' : '')};
    color: ${(props) => props.theme.colors.accent};
  }
`;

const FormInput = styled.input`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.base};
  padding: ${(props) => props.theme.spacing.md};
  border: 1px solid ${(props) => props.theme.colors.layers.layer11}40;
  border-radius: 8px;
  background: ${(props) => props.theme.colors.surface};
  color: ${(props) => props.theme.colors.layers.layer11};
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.accent};
  }

  &::placeholder {
    color: ${(props) => props.theme.colors.layers.layer11};
    opacity: 0.5;
  }

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus {
    -webkit-text-fill-color: ${(props) => props.theme.colors.layers.layer11};
    -webkit-box-shadow: 0 0 0px 1000px ${(props) => props.theme.colors.surface} inset;
    transition: background-color 5000s ease-in-out 0s;
  }
`;

const FormTextarea = styled.textarea`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.base};
  padding: ${(props) => props.theme.spacing.md};
  border: 1px solid ${(props) => props.theme.colors.layers.layer11}40;
  border-radius: 8px;
  background: ${(props) => props.theme.colors.surface};
  color: ${(props) => props.theme.colors.layers.layer11};
  min-height: 150px;
  resize: none;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.accent};
  }

  &::placeholder {
    color: ${(props) => props.theme.colors.layers.layer11};
    opacity: 0.5;
  }

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus {
    -webkit-text-fill-color: ${(props) => props.theme.colors.layers.layer11};
    -webkit-box-shadow: 0 0 0px 1000px ${(props) => props.theme.colors.surface} inset;
    transition: background-color 5000s ease-in-out 0s;
  }
`;

const FormButton = styled.button`
  display: inline-block;
  padding: ${(props) => props.theme.spacing.md} ${(props) => props.theme.spacing.xl};
  background: ${(props) => props.theme.colors.accent};
  color: ${(props) => props.theme.colors.layers.layer11};
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: ${(props) => props.theme.fontSizes.lg};
  font-weight: 600;
  text-decoration: none;
  border-radius: 8px;
  border: 2px solid ${(props) => props.theme.colors.accent};
  cursor: pointer;
  transition: all 0.2s ease;
  align-self: flex-start;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(200, 90, 61, 0.4);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const FieldError = styled.span`
  font-size: ${(props) => props.theme.fontSizes.sm};
  color: ${(props) => props.theme.colors.accent};
  margin-top: ${(props) => props.theme.spacing.xs};
`;

// Message Components
const ErrorMessage = styled.div`
  padding: ${(props) => props.theme.spacing.md};
  background: ${(props) => props.theme.colors.layers.layer1}40;
  border: 1px solid ${(props) => props.theme.colors.layers.layer1};
  border-radius: 8px;
  color: ${(props) => props.theme.colors.layers.layer11};
  font-size: ${(props) => props.theme.fontSizes.base};
  line-height: 1.6;
  margin-bottom: ${(props) => props.theme.spacing.lg};
`;

const ErrorEmail = styled.a`
  color: ${(props) => props.theme.colors.accent};
  text-decoration: underline;
  font-weight: 600;
  
  &:hover {
    text-decoration: none;
  }
`;

const SuccessMessage = styled.div`
  padding: ${(props) => props.theme.spacing.xl};
  background: linear-gradient(135deg, 
    ${(props) => props.theme.colors.layers.layer1}30, 
    ${(props) => props.theme.colors.layers.layer1}20);
  border: 1px solid ${(props) => props.theme.colors.layers.layer1};
  border-radius: 12px;
  text-align: center;
  color: ${(props) => props.theme.colors.layers.layer11};
`;

const SuccessTitle = styled.h3`
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: ${(props) => props.theme.fontSizes['2xl']};
  font-weight: 600;
  margin: 0 0 ${(props) => props.theme.spacing.md} 0;
`;

const SuccessText = styled.p`
  font-size: ${(props) => props.theme.fontSizes.base};
  line-height: 1.6;
  margin: 0;
  opacity: 0.9;
`;

const ResponseExpectation = styled.p`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.base};
  line-height: 1.7;
  color: ${(props) => props.theme.colors.layers.layer11};
  text-align: left;
  margin: ${(props) => props.theme.spacing.lg} 0 0 0;
  opacity: 0.9;
`;

const Highlight = styled.span`
  color: ${(props) => props.theme.colors.accent};
  font-weight: 600;
`;

const CenteredButton = styled(FormButton)`
  margin-top: ${(props) => props.theme.spacing.lg};
  align-self: center;
`;

// Types
interface FormData {
  name: string;
  email: string;
  company: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}


const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateEmail = (email: string): boolean => {
    return EMAIL_REGEX.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name as keyof FormErrors];
        return newErrors;
      });
    }
    setSubmitError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error('EmailJS configuration missing');
      }

      emailjs.init(publicKey);

      await emailjs.send(serviceId, templateId, {
        from_name: formData.name,
        from_email: formData.email,
        company: formData.company || 'Not provided',
        message: formData.message,
      });
      
      setIsSuccess(true);
      setFormData({ name: '', email: '', company: '', message: '' });
    } catch (error) {
      console.error('EmailJS error:', error);
      setSubmitError(
        `Something went wrong with the form. Please email me directly at ${CONTACT_EMAIL}`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderErrorMessage = () => {
    if (!submitError) return null;
    
    const parts = submitError.split(CONTACT_EMAIL);
    return (
      <ErrorMessage>
        {parts[0]}
        <ErrorEmail href={`mailto:${CONTACT_EMAIL}`}>
          {CONTACT_EMAIL}
        </ErrorEmail>
        {parts[1]}
      </ErrorMessage>
    );
  };

  if (isSuccess) {
    return (
      <PageContainer>
        <NavBar />
        <CenteredContent>
          <SuccessMessage>
            <SuccessTitle>Message Sent!</SuccessTitle>
            <SuccessText>
              Thanks for getting in touch, I'll get back to you within <Highlight>12 hours</Highlight>.
            </SuccessText>
            <CenteredButton 
              type="button" 
              onClick={() => setIsSuccess(false)}
            >
              Send Another Message
            </CenteredButton>
          </SuccessMessage>
        </CenteredContent>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <NavBar />
      <ContentContainer>
        <PageTitle>Ready to Work Together</PageTitle>
        <Subtitle>Working Holiday Visa approved. No sponsorship needed.</Subtitle>

        <SectionCard>
          <AvailabilityText>
            I have a Working Holiday Visa for Canada—I can work immediately, no sponsorship required. Open to relocating anywhere in Canada for the right opportunity.
          </AvailabilityText>
        </SectionCard>

        <SectionCard>
          <SectionTitle>Let's Connect</SectionTitle>
          
          {renderErrorMessage()}

          <FormContainer onSubmit={handleSubmit}>
            <FormField>
              <FormLabel htmlFor="name" $required>Name</FormLabel>
              <FormInput
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
              />
              {errors.name && <FieldError>{errors.name}</FieldError>}
            </FormField>

            <FormField>
              <FormLabel htmlFor="email" $required>Email</FormLabel>
              <FormInput
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
              />
              {errors.email && <FieldError>{errors.email}</FieldError>}
            </FormField>

            <FormField>
              <FormLabel htmlFor="company">Company</FormLabel>
              <FormInput
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Your company (optional)"
              />
            </FormField>

            <FormField>
              <FormLabel htmlFor="message" $required>Message</FormLabel>
              <FormTextarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell me about the opportunity..."
              />
              {errors.message && <FieldError>{errors.message}</FieldError>}
            </FormField>

            <FormButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Get in Touch'}
            </FormButton>
          </FormContainer>

          <ResponseExpectation>
            Send me a message and I'll get back to you within <Highlight>12 hours</Highlight>.
          </ResponseExpectation>
        </SectionCard>
      </ContentContainer>
    </PageContainer>
  );
};

export default Contact;
