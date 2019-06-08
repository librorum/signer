# signer
* Questions about test.
    * Test's signing out shows signature concatenated with data
    ```
        CED308BE013B95030752DD223F960DEC02735201F4E238274959ABA09C36D3542E01A0CBD2A342E349DD934A8D51564A08A8ADF9D92487E4D3362D83E9C6890D49206C6F766520424F5341474F5241
    ```    
        * Signature : CED308BE013B95030752DD223F960DEC02735201F4E238274959ABA09C36D3542E01A0CBD2A342E349DD934A8D51564A08A8ADF9D92487E4D3362D83E9C6890D49
        * data : 206C6F766520424F5341474F5241("I love BOSAGORA" in hex format)
    * Can verify process find original data only by signature?
    * Test explanation shows only signature.(So, it tooke me a while to figure out)
    ```
        CED308BE013B95030752DD223F960DEC02735201F4E238274959ABA09C36D3542E01A0CBD2A342E349DD934A8D51564A08A8ADF9D92487E4D3362D83E9C6890D49
    ```
    * I thought data should be needed to verify, so I appended hex data to hex signature.

# How to run
* Building command line tools with Node.js
    * Reference : http://blog.developer.atlassian.com/scripting-with-node/

    ```
        > cd signer
        > npm install
        > npm install -g    // to make locally runnable by typing './signer'
    ```
* If above method not works, then 
    * chmod +x ./index.js
    * run by ./index.js
    * #! has been added to index.js to work like a shell script.

* Sign
    * How to run
    ``` 
        node ./index.js sign SDSBQZ7BD2XZZPEUFWS7WQGB7BFUI7TCH474S6C5OQTNBICD7AZ2FDN6 "I love BOSAGORA"
    ```
    * Output
    ```
        Signature: ced308be013b95030752dd223f960dec02735201f4e238274959aba09c36d3542e01a0cbd2a342e349dd934a8d51564a08a8adf9d92487e4d3362d83e9c6890d49206c6f766520424f5341474f5241
    ```
    * sign data with private key
    * hex signature string(128 characters) + hex data string

* Verify
    * How to run
    ``` 
        node ./index.js verify GASG2JFZI4XKNQFF5FH2QGBXCROVJBNE43QNJWMXQQIDZZPYP3UVGTW6 CED308BE013B95030752DD223F960DEC02735201F4E238274959ABA09C36D3542E01A0CBD2A342E349DD934A8D51564A08A8ADF9D92487E4D3362D83E9C6890D49206C6F766520424F5341474F5241
    ``` 
    * Output
    ```
        Verification succeeded I love BOSAGORA
    ```
    * Split Signed Result into hex signature(128 characters) + hex data string
    * verify signature with data by public key

* Keypair generation
    * How to run
    ``` 
        node ./index.js keypair
    ``` 
    * Output
    ```
        Private : SCLW5FFQAF3VYKOH3KOUUARAV65ISCX3P3AXBWMOXQFTBB43EC56QZIA
        Public : GDMJEBN7475GCMAGBDUJEYHI5E7CPRKIQ7G7IJF2PYONFVCY4GKXH7GB
    ```
