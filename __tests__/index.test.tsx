import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import Page from "@/app/page"
import '@testing-library/jest-dom/vitest'
 
test("renderiza título da página", () => {
  render(<Page />)

  const heading = screen.getByRole("heading", { level: 1, name: /Página de intenção/i })

  expect(heading).toBeInTheDocument()
})
