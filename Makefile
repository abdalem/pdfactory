IMAGE=abdalem/pdfactory

build-image:
	docker build . -t ${IMAGE} --no-cache

generate-lock-file:
	docker run --rm --entrypoint cat ${IMAGE} ./package-lock.json > ./package-lock.json

dev-run: 
	docker-compose -f docker-compose.prod.yml -f docker-compose.dev.yml up

dev-down:	
	docker-compose -f docker-compose.prod.yml -f docker-compose.dev.yml down

prod-run:	
	docker-compose -f docker-compose.prod.yml up -d

#------TODO------
# prod-deploy: