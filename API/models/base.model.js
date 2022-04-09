class BaseModel{

    constructor(props){
        //this.name = this.constructor.name.replace(`Model`, ``);
        this.assign(props);
    }


    getSchema = () => {
        const schema = require(`../schemas/${this.constructor.name.replace(`Model`, ``).unCamelize()}.json`);
        return schema
    }
    
    assign = (props) => {
        const schema = this.getSchema();
        Object.keys(schema.columns).forEach(col=>{
            this[col] = schema.columns[col].default;
        })
        for (let key in props) {
            if (!schema.columns.hasOwnProperty(key)) {
                delete props[key];
                continue;
            }
            if(schema.columns[key].type === 'boolean'){
                props[key] = props[key] !== null ? (props[key] === '1') : null;
            }
            else if(schema.columns[key].type === 'number'){
                props[key] = props[key] !== null ? (+props[key]) : null;
            }
            else if(schema.columns[key].type === 'date'){
                props[key] =  props[key] !== null ? (new Date( props[key])) : null;
            }
            else{
                props[key] = props[key] !== null ? (props[key]) : null;
            }
        }
        Object.assign(this, props);
    }

    

    getProps = () => {
        const properties = JSON.stringify(this).toJson();
        return properties
    }

    getSqlProps = () => {
        let properties = this.getProps();
        let schema = this.getSchema();
        for (let key in properties) {         
            if(schema.columns[key].type === 'boolean'){
                properties[key] = properties[key] !== null ? (+properties[key]) : "null";
            }
            else if(schema.columns[key].type === 'number'){
                properties[key] = properties[key] !== null ? (+properties[key]) : "null";
            }
            else if(schema.columns[key].type === 'date'){
                properties[key] =  properties[key] !== null ? properties[key].toISOString() : "null";
            }
            else{
                properties[key] = properties[key] !== null ? (`'${properties[key].replace(/'/g, "''")}'`) : "null";
            }
        }
        return properties;
    }

    static from(obj){
        if(Array.isArray(obj)){
            return obj.map(item => new this(item));
        }
        else if(typeof obj == "object"){
            return new this(obj);
        }
        return;
    }

    

    
}

module.exports = BaseModel;