import help from '../images/help.png';
import PanelContext from '../Contexts/panel-context';
import  { useContext }  from 'react';

const field3 = 
{
  "connect.name": "ust.boots",
  "fields": [
    {
      "name": "boots_id",
      "type": "int"
    },
    {
      "name": "delhi_lines",
      "type": {
        "items": {
          "connect.name": "lithin.personal.order_line",
          "fields": [
            {
              "name": "product_id",
              "type": "int"
            },
            {
              "name": "category",
              "type": "string"
            },
            {
              "name": "quantity",
              "type": "int"
            },
            {
              "name": "unit_price",
              "type": "float"
            },
            {
              "name": "net_price",
              "type": "float"
            }
          ],
          "name": "order_line",
          "type": "record"
        },
        "type": "array"
      }
    }
  ],
  "name": "boots",
  "namespace": "ust",
  "type": "record"
}

const field4 = 
{
 "name": "lithin",
 "company": "UST",
 "age": "23",
 "account" : "BOOTS"
}


const field5 ={
  "name": "HttpSinkConnectorConnector_0",
  "config": {
    "value.converter.schema.registry.url": "http://schema-registry:8081",
    "name": "HttpSinkConnectorConnector_0",
    "connector.class": "io.confluent.connect.http.HttpSinkConnector",
    "key.converter": "org.apache.kafka.connect.storage.StringConverter",
    "value.converter": "io.confluent.connect.avro.AvroConverter",
    "topics": "Template_Schema",
    "http.api.url": "https://target-400-bxlquyhk2q-uc.a.run.app",
    "request.method": "post",
    "reporter.result.topic.name": "success_topic",
    "reporter.result.topic.replication.factor": "1",
    "reporter.result.topic.partitions": "1",
    "reporter.error.topic.name": "error_topic",
    "reporter.error.topic.replication.factor": "1",
    "reporter.error.topic.partitions": "1",
    "reporter.bootstrap.servers": "broker:29092",
    "tasks.max": "1",
    "behavior.on.error": "log",
    "max.retries": "1",
    "retry.backoff.ms": "1",
    "consumer.max.poll.records":"1",
    "errors.deadletterqueue.topic.name": "dead_topic",
    "errors.deadletterqueue.topic.replication.factor": "1",
    "errors.tolerance": "all",
    "errors.retry.timeout": "0",
    "errors.retry.delay.max.ms": "0"
  }
}

const field9 = "pls give a  sample json message with context of a shopping with 20 fields with valid values and with mandatory key named account"

function ImageHint({ htmlFor }) {

   const index = htmlFor.slice(-1)
   const pctx = useContext(PanelContext);


   const help_map = new Map();
   help_map.set('1', { "Msg" : "Once VM created it needs a 3 mins to be Ready" });
   help_map.set('2', { "Msg" : "The plugins defines the various destinations the data can be sent"});
   help_map.set('3', field3);
   help_map.set('4', field4);
   help_map.set('5', field5);
   help_map.set('6', 'VM deletion can take upto 3 mins');
   help_map.set('7', 'Will delete all previous stored data');
   help_map.set('8', 'Deletes all the craeted connenctors. Use this to RESET');
   help_map.set('9', field9);

   const handleClick = async () => {
    pctx.setToggle(true);
   const help = help_map.get(index);
   const formattedJSON = index === '9' ? help : JSON.stringify(help, null, 2); 
   pctx.setSchema(formattedJSON);
  };

 
    return (
      <>
      <img src={help}  onClick={handleClick} className='tiny-image' alt=""></img>
      </>
    );
  }

export default ImageHint;