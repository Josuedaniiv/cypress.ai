const openai = require('openai');
const apiKey = 'TU_CLAVE_DE_API_OPENAI'; // Replace with your OpenAI API key
const prompt = 'Genera credenciales de inicio de sesión válidas';

const generateLoginCredentials = async () => {
  const response = await openai.complete({
    engine: 'davinci',
    prompt,
    maxTokens: 100,
  });

  const generatedText = response.choices[0].text.trim();
  return generatedText;
};

describe('Prueba de login con IA', () => {
  it('User login', async () => {
    cy.visit('https://www.example.com'); // Replace with the URL you want to visit before login

    const loginCredentials = await generateLoginCredentials();

    const emailInput = cy.get('#Username');
    emailInput.should('be.visible').type(loginCredentials.username);

    const passwordInput = cy.get('#Password');
    passwordInput.should('be.visible').type(loginCredentials.password);

    const signInSubmitButton = cy.get('.btn');
    signInSubmitButton.click();

    cy.wait(5000);

    cy.url().then((url) => {
      console.log('Current URL:', url);
      expect(url).to.eq('https://www.example.com/profile'); // Replace with actual url after login
    });

    cy.contains('Bienvenido').should('be.visible');
  });
});