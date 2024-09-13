# The Subapp Generator

## Description

* This is used to create a new subapp and all its subdirectories.

1. Run ```yarn create-subapp```
2. Follow the prompts
   * Enter subapp name (all lowercase and no spaces or special characters)
   * Enter subapp nickname (use an acronym or shorthand version of the subapp name here)
   * enter comma-separated table names using snake_case for each
      * You can leave this blank if you don't want to create any migrations or entities
3. Subdirectories, entities, and migrations will be created in the subapp directory


## TODO

* Move logic to Subapp class
* Add tests
* Add documentation to README
* 