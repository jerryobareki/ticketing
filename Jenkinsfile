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
                script {
                    git credentialsId: 'git', url: 'https://github.com/jerryobareki/ticketing.git'
                }
            }
        }
        stage('Check Node.js Version') {
            steps {
                script {
                    nodejs('nodejs') {
                        sh 'node -v'
                    }
                }
            }
        }
        stage('SonarQube Analysis') {
            steps {
                script {
                    nodejs('nodejs') {
                        def scannerHome = tool 'sonarScanner'
                        withSonarQubeEnv('sonarServer') {
                            sh """
                                ${scannerHome}/bin/sonar-scanner \
                                    -Dsonar.projectKey=ticketing-app
                            """
                        }
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
                stage('build & push client') {
                    steps {
                        container('docker') {
                            sh '''
                                docker buildx build -f client/Dockerfile -t weonlife/client . --push
                            '''
                        }
                    }
                }
                stage('build & push expiration') {
                    steps {
                        container('docker') {
                            sh '''
                                docker buildx build -f expiration/Dockerfile -t weonlife/expiration . --push
                            '''
                        }
                    }
                }
                stage('build & push orders') {
                    steps {
                        container('docker') {
                            sh '''
                                docker buildx build -f orders/Dockerfile -t weonlife/orders . --push
                            '''
                        }
                    }
                }
                stage('build & push payments') {
                    steps {
                        container('docker') {
                            sh '''
                                docker buildx build -f payments/Dockerfile -t weonlife/payments . --push
                            '''
                        }
                    }
                }
                stage('build & push tickets') {
                    steps {
                        container('docker') {
                            sh '''
                                docker buildx build -f tickets/Dockerfile -t weonlife/tickets . --push
                            '''
                        }
                    }
                }
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
                emailext body: 'The job is stable and waiting to be deployed', recipientProviders: [buildUser()], subject: 'ticketing-app', to: 'jerry.obareki.cobber365@gmail.com'
            }
        }
        stage('Approval Gate') {
            steps {
                timeout(time: 2, unit: "DAYS") {
                    input message: "Waiting for approval to complete job and deploy"
                }
            }
        }
    }
    post {
        always {
            script {
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
