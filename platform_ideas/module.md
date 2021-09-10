un module est un dossier contenant plusieurs cours, quiz, challenge et projet.
Le dossier inclura un fichier ``metadata.json`` qui sera un peu comme le ``config.json`` du module, il permettra de paramètrer l'ordre des infos  contenue dans le dossier, la spécialité au quel le module est rattaché, etc ....

- #### Nomenclature
	Le nom du module est de type ``alphanumérique``.
	Le nom sera précédé du ``hash`` si possible  du commit  au quel  il est rattaché (pour la suivie)
- ### exemple de contenue
```markdown
   module web
   	- 01_cours.md
	- 02_cours.md
	- 03_cours.md
	- 01_project.md
	- 03_project.md
	- 01_quiz.json
	- 02_quiz.json
	- 03_quiz.json
	- metadata.json
	
```
- ### configuration du metadata.json
	```json
		{
			language:"javascript",
			cours:["01_cours.md", "02_cours.md", "03_cours.md"],
			projects:["01_project.md","03_project.md"],
			challenges:["challenge1","challenge2","challenge3"],
			quizzes:["01_quiz.json","02_quiz.json","03_quiz.json"]
		}
	```
