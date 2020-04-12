function generateMarkdown(userData, questionData) {
  const markdown =`
# ${questionData.title}
    
## Description

${questionData.description}

- - -

## Table of Contents
    

* [Installation](#installation)

* [Usage](#usage)

* [Tests](#tests)

* [License](#lisence)

* [Contributing](#contributing)

* [Questions](#questions)

- - -

## Installation

${questionData.installation}

- - -

## Usage

${questionData.usage}

- - -

## Tests

${questionData.tests}

- - -

## License

${questionData.license}

- - -

## Contributing

${questionData.contributing}

- - -

## Questions

![alt text](${userData.image} "profile image for ${userData.name}")


Please contact ${userData.email} with any questions.
`;
  return markdown
}


module.exports = generateMarkdown;
