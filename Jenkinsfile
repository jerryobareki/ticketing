pipeline {
    agent {
        kubernetes {
            yaml '''
                apiVersion: v1
                kind: Pod
                spec:
                  containers:
                  - name: docker
                    image: docker:latest
                    command:
                    - cat
                    tty: true
                    volumeMounts:
                    - mountPath: /var/run/docker.sock
                      name: docker-sock
                  - name: kubectl
                    image: bitnami/kubectl:latest
                    command:
                    - cat
                    tty: true
                  volumes:
                  - name: docker-sock
                    hostPath:
                      path: /var/run/docker.sock
            '''
        }
    }
    environment {
        imageVersion = '1.1'
    }
    stages {
        stage('Cleanup Workspace') {
            steps {
                cleanWs()
            }
        }
        stage('Cloning from Git') {
            steps {
                container('docker') {
                    git credentialsId: 'git', url: 'https://github.com/jerryobareki/ticketing.git'
                }
            }
        }
        stage('Code Quality Test') {
            steps {
                container('docker') {
                    withSonarQubeEnv('sonarServer') {
                        sh 'sonar-scanner -Dsonar.projectKey=ticketing-app'
                    }
                }
            }
        }

        stage('Logging in to Docker') {
            steps {
                container('docker') {
                    withCredentials([usernamePassword(credentialsId: 'docker', passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {
                        sh '''
                            echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin
                        '''
                    }
                }
            }
        }
        stage('Building and Pushing Docker Images') {
            parallel {
                stage('build & push auth') {
                    steps {
                        container('docker') {
                            sh '''
                                docker buildx build -f auth/Dockerfile -t weonlife/auth . --push
                            '''
                        }
                    }
                }
                // Add more parallel stages here if needed
            }
        }
        stage('Logging out of Docker') {
            steps {
                container('docker') {
                    sh '''
                        docker logout
                    '''
                }
            }
        }
        stage('Email notification') {
            steps {
                emailext body: 'The job is stable and waiting to be deployed', recipientProviders: [buildUser()], subject: 'ticketing-app', to: 'obarekijerry@outlook.com'
            }
        }
        stage('Approval Gate') {
            steps{
                timeout(time:2 , unit:"DAYS"){
                    input message: "Waiting for approval to complete job and deploy"
                }
            }
        }
    }
    post {
        always {
            script {
                // Clean up Docker system and containers
                container('docker') {
                    sh '''
                        docker system prune -af || true
                        docker ps -q | xargs -r docker stop || true
                        docker ps -aq | xargs -r docker rm || true
                    '''
                }
                cleanWs() // Clean up workspace files
            }
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed. Check the logs for details.'
        }
        unstable {
            echo 'Pipeline completed with issues.'
        }
    }
}
