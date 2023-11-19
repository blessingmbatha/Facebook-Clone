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
      }
}
