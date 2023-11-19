pipeline {
       agent any
           tools{
               jdk 'jdk17'
               nodejs 'node16'
           }
       stages {
            stage('Cleanup Workspace'){
               steps {
                    cleanWs()
               }
            }
            stage('Git Checkout'){
               steps {
                    cleanWs()
               }
            }
       }
}
