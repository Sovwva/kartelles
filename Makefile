pip:
	pip install -r ./requirements.txt

nf:
	flask --app run init-db

run:
	flask --app run config --debug

ni:
	npm install

ns:
	npm run start