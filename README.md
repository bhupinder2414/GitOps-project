# GitOps with Azure: Continuous Deployment Using ArgoCD

This repository demonstrates how to implement GitOps principles on Azure Kubernetes Service (AKS) using ArgoCD for continuous deployment.

## Project Overview
- **Objective**: Deploy a Kubernetes-based application using GitOps with AKS and ArgoCD.
- **Components**:
  - Azure Kubernetes Service (AKS): Kubernetes cluster for application deployment.
  - ArgoCD: GitOps tool for managing Kubernetes deployments.
  - GitHub: Repository for storing Kubernetes manifests and application code.
  - Node.js: Sample application for demonstration.

## Project Structure
```
gitops-azure-project/
├── manifests/
│   ├── deployment.yaml
│   ├── service.yaml
│   └── ingress.yaml
├── app/
│   ├── Dockerfile
│   ├── app.js
│   └── package.json
├── .gitignore
├── README.md
└── argocd-config.yaml
```

## Prerequisites
1. Azure account (with Azure Free Tier access).
2. Docker installed and configured.
3. Kubernetes CLI (`kubectl`) installed.
4. Basic knowledge of Kubernetes and GitOps principles.

## Setup Instructions

### 1. Create Azure Kubernetes Service (AKS)
1. Use the Azure Portal or CLI to create an AKS cluster.
2. Configure `kubectl` to connect to the AKS cluster:
   ```bash
   az aks get-credentials --resource-group <resource-group> --name <aks-cluster-name>
   ```

### 2. Deploy ArgoCD
1. Install ArgoCD on the AKS cluster:
   ```bash
   kubectl create namespace argocd
   kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
   ```
2. Access the ArgoCD UI:
   - Retrieve the ArgoCD server's external IP address:
     ```bash
     kubectl get svc -n argocd
     ```
   - Log in using the default admin credentials (password can be fetched from a secret):
     ```bash
     kubectl get secret argocd-initial-admin-secret -n argocd -o jsonpath="{.data.password}" | base64 -d
     ```

### 3. Configure GitHub Repository
1. Create a GitHub repository and clone it locally.
2. Add the provided `manifests/` and `app/` directories to the repository.
3. Push the repository to GitHub.

### 4. Configure ArgoCD Application
1. Edit the `argocd-config.yaml` file:
   ```yaml
   source:
     repoURL: https://github.com/<your-github-username>/gitops-azure-project.git
     targetRevision: HEAD
     path: manifests
   ```
2. Apply the configuration to the ArgoCD namespace:
   ```bash
   kubectl apply -f argocd-config.yaml
   ```

### 5. Build and Push Docker Image
1. Build the Docker image for the sample application:
   ```bash
   docker build -t <your-dockerhub-username>/sample-app:latest ./app
   ```
2. Push the image to Docker Hub:
   ```bash
   docker push <your-dockerhub-username>/sample-app:latest
   ```

### 6. Deploy Application via ArgoCD
1. Verify the application is listed in the ArgoCD UI.
2. Sync the application to deploy it to the AKS cluster.
3. Monitor the deployment and ensure all resources are created successfully.

## Testing the Application
1. Retrieve the application URL:
   - If using a LoadBalancer service, get the external IP:
     ```bash
     kubectl get svc sample-app-service
     ```
   - If using ingress, use the configured domain.
2. Open the URL in a browser to access the application.

## Clean-Up
1. Delete the AKS cluster to avoid unnecessary costs:
   ```bash
   az aks delete --resource-group <resource-group> --name <aks-cluster-name>
   ```
2. Remove any deployed resources from the cluster.

## Key Features of This Project
- **GitOps Principles**: Automates deployments and ensures infrastructure is always in sync with Git.
- **ArgoCD**: Provides an intuitive UI for managing Kubernetes applications.
- **Scalable Architecture**: Built with future expansion in mind.

## Learning Outcomes
1. Understand GitOps workflows using ArgoCD.
2. Deploy and manage Kubernetes-based applications on AKS.
3. Gain hands-on experience with Azure, Kubernetes, and Docker.

## References
- [ArgoCD Documentation](https://argo-cd.readthedocs.io/)
- [Azure Kubernetes Service Documentation](https://learn.microsoft.com/en-us/azure/aks/)
- [GitOps Principles](https://www.gitops.tech/)
