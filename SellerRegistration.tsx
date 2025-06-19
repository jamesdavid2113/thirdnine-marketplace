
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Camera, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import NavBar from "@/components/NavBar";
import { toast } from "@/components/ui/use-toast";

const sellerSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  city: z.string().min(2, { message: "Please enter your city" }),
  postalCode: z.string().min(4, { message: "Please enter a valid postal code" }),
  profilePicture: z.string().min(1, { message: "Profile picture is required" }),
});

type SellerFormValues = z.infer<typeof sellerSchema>;

const SellerRegistration = () => {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState<string>("");
  
  const form = useForm<SellerFormValues>({
    resolver: zodResolver(sellerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      city: "",
      postalCode: "",
      profilePicture: "",
    },
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        const imageData = event.target.result.toString();
        setProfileImage(imageData);
        form.setValue("profilePicture", imageData);
      }
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = (data: SellerFormValues) => {
    // In a real app, this data would be sent to the backend
    console.log("Seller registration data:", data);
    
    toast({
      title: "Profile information saved",
      description: "Let's set up your account credentials next",
    });
    
    // Store the user data in session storage for the next step
    sessionStorage.setItem("sellerProfile", JSON.stringify(data));
    
    // Navigate to account creation
    navigate("/seller/account");
  };

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <div className="container mx-auto max-w-md px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold">Create Seller Profile</h1>
          <p className="text-muted-foreground">Tell us about yourself</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Profile Picture Upload */}
            <div className="flex flex-col items-center justify-center space-y-4">
              <Avatar className="h-32 w-32 cursor-pointer border-4 border-primary">
                {profileImage ? (
                  <AvatarImage src={profileImage} alt="Profile picture" />
                ) : (
                  <AvatarFallback className="bg-secondary text-5xl">
                    <User className="h-16 w-16" />
                  </AvatarFallback>
                )}
              </Avatar>
              <FormItem>
                <FormControl>
                  <div className="flex items-center justify-center">
                    <label htmlFor="profile-upload" className="cursor-pointer">
                      <div className="flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-primary-foreground">
                        <Camera className="h-4 w-4" />
                        <span>{profileImage ? "Change Photo" : "Upload Photo"}</span>
                      </div>
                      <input 
                        id="profile-upload" 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={handleImageUpload}
                      />
                    </label>
                  </div>
                </FormControl>
                {form.formState.errors.profilePicture && (
                  <FormMessage>{form.formState.errors.profilePicture.message}</FormMessage>
                )}
              </FormItem>
            </div>

            {/* Personal Information */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="your@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number (WhatsApp preferred)</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="+1234567890" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="Your city" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="postalCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Postal Code</FormLabel>
                    <FormControl>
                      <Input placeholder="12345" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="w-full rounded-full" size="lg">
              Continue
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SellerRegistration;
