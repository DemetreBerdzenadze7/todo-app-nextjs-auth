import DemoAccounts from "@/components/loginComponent/DemoAccounts";
import LoginBrandPanel from "@/components/loginComponent/LoginBrandPanel";
import LoginForm from "@/components/loginComponent/LoginForm";
import Logo from "@/components/sharedComponent/Logo";

export default function LoginPage() {
  return (
    <main className="grid flex-1 desktop:grid-cols-2">
      <LoginBrandPanel />

      <section className="flex items-center justify-center px-gutter py-10 tablet:px-gutter-tablet">
        <div className="w-full max-w-md">
          <div className="mb-8 flex justify-center desktop:hidden">
            <Logo />
          </div>

          <LoginForm />
          <DemoAccounts />
        </div>
      </section>
    </main>
  );
}
