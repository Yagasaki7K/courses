# Course of Salesforce

These are study notes based on the course that was taken. The same file will be available at yagasaki.dev

## What's is SOAP API?

SOAP stands for Simple Object Access Protocol like a XML to declare your responses and requests.
Create, Retrieve, Delete, Upload Records.

## Difference between XML and JSON

![https://prnt.sc/4rWImzdaVTI6]()

JSON is more human readable than XML.
JSON is capable to reads array, XML not.

## SOAP Authentication
POST: https://login.salesforce.com/services/Soap/c/56.0
Content-type: text/xml
SOAPAction: ''

Body:
<?xml version="1.0" encoding="utf-8" ?>
<env:Envelope xmlns:xsd="http://www.w3.org/2001/XMLSchema"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:env="http://schemas.xmlsoap.org/soap/envelope/">
  <env:Body>
    <n1:login xmlns:n1="urn:enterprise.soap.sforce.com">
      <n1:username>Username</n1:username>
      <n1:password>passwordsecuritytoken</n1:password>
    </n1:login>
  </env:Body>
</env:Envelope>

## SOAP Call to Query Cases
You get a answer about the last request and get <serverUrl> URL to send another request to your personal
project authenticated. The configs about this POST methos is the same than above.

<?xml version="1.0" encoding="utf-8"?>   
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
   xmlns:urn="urn:enterprise.soap.sforce.com">
  <soapenv:Header>
     <urn:SessionHeader>
        <urn:sessionId>00D2800000177ZX!ARIAQKMgB7ZXr54bNo2MOzcycA3W1ompRUYkbF6MtYRWGFvW4Hqn9Ardp5hvZywyjnBfqkREmnfcnf2ReRtA.P.cMbsm_Uh9</urn:sessionId>
     </urn:SessionHeader>
  </soapenv:Header>
  <soapenv:Body>
     <urn:query>
        <urn:queryString>SELECT id,CaseNumber,Origin FROM Case</urn:queryString>
     </urn:query>
  </soapenv:Body>
</soapenv:Envelope>

Explaining the code. Session ID is right below the server URL that was generated, so make sure that you copy
this entire session ID. Instead of entering username and password over times, you gonna use just a Session ID for authentication.

Now we have a Session ID, when you do a request using the settings above, you get a ID of Cases Objects.

## SOAP Call to Query Accounts

Now we have a Session ID, when you do a request using the settings below, you get a ID of Accounts.

> Remember, everytime than your sessionID is expires, you can back to first step, use the request again and get a new sessionID to authenticate.

<?xml version="1.0" encoding="utf-8"?>   
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
   xmlns:urn="urn:enterprise.soap.sforce.com">
  <soapenv:Header>
     <urn:SessionHeader>
        <urn:sessionId>00D2800000177ZX!ARIAQKMgB7ZXr54bNo2MOzcycA3W1ompRUYkbF6MtYRWGFvW4Hqn9Ardp5hvZywyjnBfqkREmnfcnf2ReRtA.P.cMbsm_Uh9</urn:sessionId>
     </urn:SessionHeader>
  </soapenv:Header>
  <soapenv:Body>
     <urn:query>
        <urn:queryString>SELECT id,AccountNumber,Name,Type FROM Account</urn:queryString>
     </urn:query>
  </soapenv:Body>
</soapenv:Envelope>

## Create Records in Salesforce using SOAP API

Is basically to create a account using the SOAP using names and phones writes on code.

<?xml version="1.0" encoding="utf-8"?>   
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
   xmlns:urn="urn:enterprise.soap.sforce.com">
  <soapenv:Header>
     <urn:SessionHeader>
        <urn:sessionId>00D2800000177ZX!ARIAQDbFDMbsFKPFyr.omMbHoN8235ptP5he3rucPfpvicaLnFcSkHcLwNPIel_7KWFqxOqONzi2APdV9rfS4FbJ7uyrLGq_</urn:sessionId>
     </urn:SessionHeader>
  </soapenv:Header>
  <soapenv:Body>
     <urn:create>
      <urn:sObjects xsi:type="urn:Account" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
       <Name>Peter Parker</Name>
       <Phone>2345678900</Phone>
      </urn:sObjects>
     </urn:create>
  </soapenv:Body>
</soapenv:Envelope>

## Create Records in Multiple Objects using SOAP API

We are setting xsi:type="urn:Account" and xsi:type="urn:Contact" to send to different objects the requests
settings before. Like a FirstName, LastName and etc ..

<?xml version="1.0" encoding="utf-8"?>   
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
   xmlns:urn="urn:enterprise.soap.sforce.com">
  <soapenv:Header>
     <urn:SessionHeader>
        <urn:sessionId>00D2800000177ZX!ARIAQM_b6nLIEAjho5m67z5x3QML4QTkfH9td3F3k2eCIObha9lO1TMI87MFx0yBn9ykM6Cke14zDlyDkWLU5EmSN3c8Ve.Y</urn:sessionId>
     </urn:SessionHeader>
  </soapenv:Header>
  <soapenv:Body>
     <urn:create>
      <urn:sObjects xsi:type="urn:Account" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
       <Name>Sanjay Kumaran</Name>
       <Phone>9999999999</Phone>
      </urn:sObjects>
      <urn:sObjects xsi:type="urn:Contact" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
       <FirstName>Aditi</FirstName>
       <LastName>Kumarika</LastName>
       <Phone>1234567890</Phone>
       <Email>test@test.com</Email>
      </urn:sObjects>
     </urn:create>
  </soapenv:Body>
</soapenv:Envelope>

-- 

The request body of this requisitions is similar pto each other, the schema to send a post method is 
equal to every request, getting the url to send, tell on the header is content type is text/xml, 
send a SOAPAction empty and after it, write the request using XML and send it.

## Create Custom SOAP Webservice / APEX Class

When you're creating the Apex Class, you're using the Web Service, like this below, a simple code to create a contact
and get the id of him when is created.

```java
global class AccountDetails {
  webservice static Account GetAccount (String, AccountId) {
    Account Acct=[select Id, Name, Phone, Industry from Account where Id=: AccountId]
    
    return Acct;
  }
}
```

<?xml version="1.0" encoding="utf-8"?>   
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
   xmlns="http://soap.sforce.com/schemas/class/dev02/AccountDetails">
  <soapenv:Header>
     <SessionHeader>
        <sessionId>00D2800000177ZX!ARIAQM_b6nLIEAjho5m67z5x3QML4QTkfH9td3F3k2eCIObha9lO1TMI87MFx0yBn9ykM6Cke14zDlyDkWLU5EmSN3c8Ve.Y</sessionId>
    </SessionHeader>
  </soapenv:Header>
  <soapenv:Body>
     <GetAccount>
     <AccountId>0010K00002jZzNxQAK</AccountId>
     </GetAccount>
  </soapenv:Body>
</soapenv:Envelope>
