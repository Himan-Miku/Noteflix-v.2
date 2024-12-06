build:
	docker build -f Dockerfile -t noteflix .
run:
	docker run -it --rm --name noteflix-container -p 3000:3000 noteflix
terraform-destroy:
	cd terraform/remote-provisioning && terraform destroy -auto-approve