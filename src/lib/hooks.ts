import { useToast } from "@/ui/shadcn/use-toast";

export const useAlert = () => {
  const { toast } = useToast();

  return {
    notice: (msg: string) => {
      toast({ description: msg, duration: 1500 });
    },
    warning: (msg: string) => {
      toast({ description: msg, duration: 1500, variant: "destructive" });
    },
  };
};
