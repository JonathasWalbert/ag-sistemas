import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import "@testing-library/jest-dom/vitest";

import CompleteIntentForm from "@/components/common/completeIntentForm";

const pushMock = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

global.fetch = vi.fn();

describe("CompleteIntentForm - Submit", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    (global.fetch as any).mockResolvedValue({
      json: async () => ({ success: true }),
    });
  });

  it("deve enviar o formulário com dados válidos e redirecionar", async () => {
    render(<CompleteIntentForm data={{ id: "123" }} />);
    const user = userEvent.setup();

    // Preencher dados válidos
    await user.type(screen.getByPlaceholderText("Nome"), "Jonathas");
    await user.type(screen.getByPlaceholderText("email@gmail.com"), "test@test.com");
    await user.type(screen.getByPlaceholderText("Nome da empresa"), "AG Sistemas");
    await user.type(screen.getByPlaceholderText("11984051486"), "11999999999");
    await user.type(screen.getByPlaceholderText("18"), "27");
    await user.type(screen.getByPlaceholderText("São Paulo"), "Macapá");
    await user.type(screen.getByPlaceholderText("Bahia"), "Amapá");

    // Clicar no botão
    await user.click(screen.getByRole("button", { name: /cadastrar/i }));

    // Verifica chamada do fetch para cadastro
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "/api/user/register",
        expect.objectContaining({
          method: "POST",
          headers: { "Content-type": "application/json" }
        })
      );
    });

    // Verifica atualização da intenção
    expect(global.fetch).toHaveBeenCalledWith(
      "/api/admin/intent/123/completed",
      expect.objectContaining({
        method: "PUT",
      })
    );

    //  Verifica redirecionamento
    await waitFor(() => {
        expect(pushMock).toHaveBeenCalledWith("/cadastrado");
    });
  });
});
