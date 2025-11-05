import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom/vitest";

import IntentForm from "@/components/common/intentForm";

describe("IntentForm - Validação Zod", () => {
  it("deve exibir erros ao tentar enviar vazio", async () => {
    render(<IntentForm />);

    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: /enviar/i }));

    expect(await screen.findByText(/Digite seu nome/i)).toBeInTheDocument();
    expect(await screen.findByText(/Email inválido/i)).toBeInTheDocument();
    expect(await screen.findByText(/Digite o nome da sua empresa/i)).toBeInTheDocument();
    expect(await screen.findByText(/Digite seu motivo com no mínimo 10 caracteres/i)).toBeInTheDocument();
  });
});
