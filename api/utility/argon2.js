import argon2 from 'argon2';

async function hash(key)
{
    try
    {
        return await argon2.hash(key);
    }
    catch (error)
    {
        throw new Error(error.message);
    }
}

async function verify(hashedKey, key)
{
    try
    {
        return await argon2.verify(hashedKey, key);
    }
    catch (error)
    {
        throw new Error(error.message);
    }
}

export default
{
    hash,
    verify
};