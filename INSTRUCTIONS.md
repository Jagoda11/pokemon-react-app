# Project Instructions

Build a web application that uses the Pokémon API to display a list of Pokémon and their details. The application should have two pages: a list of Pokémon and a detail page for each individual Pokémon. The detail page should also display the selected Pokémon's evolutions, if any.

## API Documentation

- Pokémon API Documentation
- Endpoint for Pokémon List: <https://pokeapi.co/api/v2/pokemon>
- Endpoint for Pokémon Details: <https://pokeapi.co/api/v2/pokemon/{id> or name}/
- Endpoint for Pokémon Species: <https://pokeapi.co/api/v2/pokemon-species/{id}>
- Endpoint for Pokémon Evolution Chain: You retrieve this from the species endpoint evolution_chain.url

## Technical Requirements

- Use any TypeScript framework (Angular, Vue, React, as long as it is TypeScript).

## Acceptance Criteria

1. A list of 10 Pokémon should be displayed on the list page, including their names and images.
2. Users should be able to navigate in the list using next and previous buttons to get 10 new Pokémon.
3. Clicking on a Pokémon in the list should navigate to the detail page, which should display the Pokémon's name, image, abilities (names), and evolutions (if any).
4. If the selected Pokémon has evolutions, they should be displayed as a list with their images and names. Clicking on an evolution should navigate to its detail page.
5. Users should be able to navigate between the list and detail pages using the browser's back and forward buttons.
6. Users should be able to bookmark (web browser) or share a link of their favorite Pokémon's details page.

## Tests 🧪

- Implement tests for bullet points 1 and 2 in the acceptance criteria.

## Note

You don't have to spend too much time on styling if you're limited on time. Just focus on building an application that will make even Pikachu proud.

When Finished

You have been invited as an outside collaborator in this repository. Please send the code test to us by:

- Create a new branch in this repository
- Create a pull request from that branch to the main branch
