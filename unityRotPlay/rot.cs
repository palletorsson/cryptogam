// use this to scrip to make a simpel synthesizer with the Unity 3d game engine

using UnityEngine;

public class rot : MonoBehaviour
{
    [Range(1f, 100f)]
    public float speedUpDown = 0;
    [Range(1f, 20f)]
    public float distanceUpDown = 1;
    [Range(-50f, 50f)]
    public float offset = 0;
    void FixUpdate()
    {
        Vector3 mov = new Vector3(
              (Mathf.Cos(speedUpDown * Time.time) * distanceUpDown) + offset,
              transform.position.y,
              (Mathf.Sin(speedUpDown * Time.time) * distanceUpDown) + offset);
        transform.position = mov;
        distanceUpDown = distanceUpDown + 0.01f;
        if ( distanceUpDown > 10.0f) {

            speedUpDown = 0;
        }

    }
}
