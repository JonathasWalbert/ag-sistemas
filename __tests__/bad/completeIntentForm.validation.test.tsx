import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom/vitest";

import CompleteIntentForm from "@/components/common/completeIntentForm";

describe("CompleteIntentForm - Validação Zod", () => {
  it("deve exibir erros ao tentar enviar vazio", async () => {
    render(<CompleteIntentForm data={null} />);

    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: /cadastrar/i }));

    expect(await screen.findByText(/Digite seu nome/i)).toBeInTheDocument();
    expect(await screen.findByText(/Email inválido/i)).toBeInTheDocument();
    expect(await screen.findByText(/Digite o nome da sua empresa/i)).toBeInTheDocument();
    expect(await screen.findByText(/Digite um telefone válido \(11 dígitos\)/i)).toBeInTheDocument();
    expect(await screen.findByText(/Digite sua idade/i)).toBeInTheDocument();
    expect(await screen.findByText(/Digite sua cidade/i)).toBeInTheDocument();
    expect(await screen.findByText(/Digite seu estado/i)).toBeInTheDocument();

  });
});
