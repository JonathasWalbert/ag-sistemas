import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import "@testing-library/jest-dom/vitest";

import IntentForm from "@/components/common/intentForm";

const pushMock = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

global.fetch = vi.fn();

describe("IntentForm - Submit", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    (global.fetch as any).mockResolvedValue({
      json: async () => ({ success: true }),
    });
  });

  it("deve enviar o formulário com dados válidos e redirecionar", async () => {
    render(<IntentForm />);
    const user = userEvent.setup();

    // Preencher dados válidos
    await user.type(screen.getByPlaceholderText("Nome"), "Jonathas");
    await user.type(screen.getByPlaceholderText("email@gmail.com"), "test@test.com");
    await user.type(screen.getByPlaceholderText("Nome da empresa"), "AG Sistemas");
    await user.type(screen.getByPlaceholderText("Por que você quer participar ?"), "Quero me tornar full stack na AG sistemas");


    // Clicar no botão
    await user.click(screen.getByRole("button", { name: /enviar/i }));

    // Verifica chamada do fetch para cadastro
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "/api/intent",
        expect.objectContaining({
          method: "POST",
          headers: { "Content-type": "application/json" }
        })
      );
    });

  });
});
