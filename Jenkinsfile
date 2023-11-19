pipeline {
       agent any
           tools{
               jdk 'jdk17'
               nodejs 'node16'
           }
       environment {
        SCANNER_HOME=tool 'sonar-scanner'
       }
       stages {
            stage('Cleanup Workspace'){
               steps {
                    cleanWs()
               }
            }
            stage('Git Checkout'){
               steps {
                    git changelog: false, poll: false, url: 'https://github.com/blessingmbatha/Facebook-Clone.git'
               }
            }
            stage("Sonarqube Analysis "){
               steps{
                    withSonarQubeEnv('sonar-server') {
                          sh ''' $SCANNER_HOME/bin/sonar-scanner -Dsonar.projectName=Facebook \
                          -Dsonar.projectKey=Facebook '''
                    }
               }
            }
            stage("quality gate"){
                steps {
                      script {
                           waitForQualityGate abortPipeline: false, credentialsId: 'sonar-token' 
                      }
                } 
            }
            stage('Install Dependencies') {
                steps {
                       sh "npm install"
                }
            }
            stage('OWASP FS SCAN') {
                steps {
                    dependencyCheck additionalArguments: '--scan ./ --disableYarnAudit --disableNodeAudit', odcInstallation: 'OWASP DC'
                    dependencyCheckPublisher pattern: '**/dependency-check-report.xml'
                }
            }
            stage('TRIVY FS SCAN') {
                steps {
                    sh "trivy fs . > trivyfs.txt"
                }
            }
            stage("Docker Build & Push"){
                steps{
                    script{
                        withDockerRegistry(credentialsId: 'docker', toolName: 'docker'){   
                            sh "docker build --build-arg FACEBOOK_API_KEY='facebook-token' -t facebook ."
                            sh "docker tag facebook nkosenhlembatha/facebook:latest "
                            sh "docker push nkosenhlembatha/facebook:latest "
                        }
                     }
                 }
            }
            stage("TRIVY"){
                steps{
                    sh "trivy image nkosenhlembatha/facebook:latest > trivyimage.txt" 
                }
            }
            stage('Deploy to container'){
                steps{
                    sh 'docker run -d --name facebook -p 8081:80 nkosenhlembatha/facebook:latest'
                }
            } 
      }
}
