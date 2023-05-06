module.exports = function (plop) {
  plop.setGenerator('component', {
    description: 'Create a new React component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is the component name?',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'packages/react-components/src/{{pascalCase name}}/{{pascalCase name}}.tsx',
        templateFile: 'plop-templates/component.tsx.hbs',
      },
      {
        type: 'add',
        path: 'packages/react-components/src/{{pascalCase name}}/{{pascalCase name}}.stories.tsx',
        templateFile: 'plop-templates/play.stories.tsx.hbs',
      },
      {
        type: 'add',
        path: 'packages/react-components/src/{{pascalCase name}}/{{pascalCase name}}.test.tsx',
        templateFile: 'plop-templates/component.test.tsx.hbs',
      },
      {
        type: 'add',
        path: 'packages/react-components/src/{{pascalCase name}}/index.ts',
        templateFile: 'plop-templates/index.ts.hbs',
      },
    ],
  });
};
