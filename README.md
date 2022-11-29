## aws_socket_react_chat

## Requirements

 1. User is able to select native language and target language
 2. Messages are translated from native language to target language via AWS Translate
 3. User is able to upload a document which translated to target language
 4. Real-time chat capability using Socket.io

## Demo
![enter image description here](https://citi-lingo.s3.us-east-1.amazonaws.com/React-App-Google-Chrome-2022-11-29-14-42-48.gif?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEwaCXVzLWVhc3QtMSJHMEUCIAJQMWnOZITTl7rN8zjIQlJZAYAxH3fMrJBk3E2337BLAiEAg9aqedKDQZthn5QL1%2bpTfnSUnwEaeaOiTrKuPfAuY2Eq5AIIZBAAGgw1Njk3MDUxMjk3ODUiDEUxwxpl986h8yQQzSrBAs%2beuNH%2bcQnhLEA7dSJULVAUk%2blYcMOi%2b3CCDaSrEZn9BTPTMnD0ecXAsSg8wivPkU1Qarilkpj%2bdFzSSCeibT/rrTD31NvB6b2X%2bqWbDDNeT7R%2bw4cqCDzKl/YMMVqVnQ%2bdW3FwYJ4Xd22dWkWxhrA6JiqR1BxaXTE1egeNdRcnD9F/rOj7x/juw9iu7MWslcKuRCdfl3SeLs71lxdrSVm02oCsMPevfO8rkjFrm6fQgV4Iyt/hb%2b5XOtvP6FLhg2gASko7/hKXbFezHDhy02qH94emz%2bUeACem2Ceua8kRVI9%2bWe9TGxOd3v/EGX7CzCwuwv646ugQdkXEYuKHctg4GM21aaGJZQ52D/DqVfxSHiot%2bjO%2bh6wy64oHbje7mhEeeUelIMbZpR6UHjyrTLloR11ubKOsocIHMNzpm9PGETDmsZmcBjqzAlKWXUarhhSDpbPr7%2bDjjfOLfW8qtcv%2bczWSOKHxdZOrr8JzKvyqgvYL4NvE7DqWUrh442NVodaIazkaLkqniWsvc%2buyAkqbc3i7NukQUuq53Amp8rnHLWBEoppat9CODNobcdphK2GS8BzaECKy5z/a901HKiTb0wjvVUXDk2fSepIL47MUIkDUogDIKUnBbM8bABmcbd1twaRft6vkzYTGgLbPLfI5A4td7yxj4RsKb0CTCLNdBuVuuNmZJvaLymyLvQmce8H6eHnFAt%2bKkNNsl3CAie24U7LCw4JZwnBrWIG48nv6iBk0bAE2N6pUELBEdGjo4Ol6oJoVIXA8z4vLwuAZq64S4Vak9AJl4ZWVWd0g36ec2mCc5vLj%2bB7ATjrXQXNKTDROm6Qy2jX4Ta/Gahs=&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20221129T195740Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAYJJISM44SWAXHO5H/20221129/us-east-1/s3/aws4_request&X-Amz-Signature=371cefad8a78a0f1af28958deb81b95de422b16115281e3d49cd8fe7727f126f)

## System diagram

```mermaid
sequenceDiagram
React Frontend->> NodeJs Server: message
Note left of NodeJs Server: Establish socket connection
NodeJs Server ->> AWS Translate : message
Note right of AWS Translate: AWS Translates message
AWS Translate ->> NodeJs Server: translated message
NodeJs Server ->> React Frontend: translated Message



```

## Instruction

1. git clone this repo
2. cd backend
3. npm install
4. node server.js
5. cd frontend
6. npm install
7. npm start

Login Info: 
1. test@gmail.com - 12345678
2. test2@gmail.com - 12345678

