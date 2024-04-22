build:
	docker build -f Dockerfile -t noteflix .
run:
	docker run -it --rm -p 3000:3000 noteflix