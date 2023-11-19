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
      }
}
